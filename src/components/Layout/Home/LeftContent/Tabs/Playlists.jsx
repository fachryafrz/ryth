import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function TabPlaylists() {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: [`/api/browse/featured-playlists`],
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey[0]).then(({ data }) => data);
    },
  });

  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.playlists.items.length);
  };

  return (
    <>
      {loading && (
        <div className={`flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} info={false} />
          ))}
        </div>
      )}

      {!loading &&
        data?.playlists.items.length > 0 &&
        data.playlists.items.slice(0, showLimit).map((playlist, i) => {
          const image = playlist.images[0].url;

          return (
            <CardLong
              key={playlist.id}
              item={playlist}
              image={image}
              link={`/${playlist.type}/${playlist.id}`}
            />
          );
        })}

      {!loading && data?.playlists.items.length === 0 && (
        <span
          className={`text mx-auto flex h-full w-fit items-center justify-center text-center text-sm font-medium text-neutral-500 placeholder-accent-content`}
        >
          No playlists available.
        </span>
      )}

      {!loading && data?.playlists.items.length > showLimit && (
        <div className={`mt-4 flex justify-center`}>
          <button
            onClick={handleShowMore}
            className={`btn btn-ghost btn-sm w-full text-primary`}
          >
            Show more
          </button>
        </div>
      )}
    </>
  );
}
