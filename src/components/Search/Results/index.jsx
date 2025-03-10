"use client";

import CardVertical from "@/components/Card/CardVertical";
import RetryAfter from "@/components/Modals/RetryAfter";
import SkeletonCard from "@/components/Skeleton/Card";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const loadMoreRef = useRef(null);
  const { isRequired } = useRequiredFilter();

  const requiredFilter = ["seed_artists", "seed_genres", "seed_tracks"];
  const hasAnyFilter = requiredFilter.some((param) => searchParams.has(param));

  // Query Client
  const queryClient = useQueryClient();

  // Use TanStack Query for data fetching
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [`/api/recommendations?${searchParams.toString()}`],
    queryFn: async ({ queryKey }) =>
      await axios.get(queryKey[0]).then(({ data }) => data),
    enabled: hasAnyFilter,
    staleTime: Infinity, // Adjust as needed
    cacheTime: Infinity, // Adjust as needed
  });

  const songs = useMemo(() => {
    if (!data) return [];

    const uniqueSongs = data.tracks.filter(
      (item, index, self) => self.findIndex((t) => t.id === item.id) === index,
    );

    return uniqueSongs;
  }, [data]);

  // Fetch more songs
  const fetchMoreSongs = useCallback(async () => {
    const newKey = `/api/recommendations?${searchParams.toString()}&offset=${songs.length}`;
    const newData = await axios.get(newKey).then(({ data }) => data);

    queryClient.setQueryData(
      [`/api/recommendations?${searchParams.toString()}`],
      (prevData) => {
        if (!prevData) return newData;
        return {
          ...newData,
          tracks: [...prevData.tracks, ...newData.tracks],
        };
      },
    );
  }, [queryClient, searchParams, songs.length]);

  // Infinite load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreSongs();
        }
      },
      { threshold: 0.5 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchMoreSongs]);

  return (
    <div className={`flex-1 @container`}>
      {!isLoading && songs?.length === 0 && (
        <div
          className={`grid h-full place-content-center text-pretty pb-24 text-center text-4xl font-bold`}
        >
          Tune your music with filters!
        </div>
      )}

      <ul
        className={`-mx-2 grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
      >
        {/* Initial loading */}
        {isLoading &&
          songs?.length === 0 &&
          [...Array(20)].map((_, i) => (
            <li key={i}>
              <SkeletonCard type={`track`} />
            </li>
          ))}

        {songs?.length > 0 &&
          songs.map((item) => {
            if (!item) return null;

            const [image] =
              item.images ?? item.album?.images ?? item.track?.album?.images;

            return (
              <li key={item.id}>
                <CardVertical
                  item={item.track ?? item}
                  image={image?.url ?? "/maskable/maskable_icon_x192.png"}
                />
              </li>
            );
          })}

        {/* Infinite loading */}
        {songs?.length > 0 &&
          [...Array(20)].map((_, i) => (
            <li key={i} ref={i === 0 ? loadMoreRef : null}>
              <SkeletonCard type={`track`} />
            </li>
          ))}
      </ul>

      {error && error.response.status === 429 && (
        <RetryAfter retryAfter={error.response.headers["retry-after"]} />
      )}
    </div>
  );
}
