import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

export default function TabSavedTracks() {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: `/api/me/tracks`,
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey).then(({ data }) => data);
    },
  });

  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.items.length);
  };

  return (
    <div>
      {loading && (
        <div className={`flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} info={false} />
          ))}
        </div>
      )}

      {!loading &&
        data?.items.length > 0 &&
        data.items.slice(0, showLimit).map((item, i) => {
          const [image] = item.track.album.images;
          const releaseDate = moment(item.release_date).format("MMMM DD, YYYY");
          const runtime = `${moment(item.track.duration_ms).format("m:ss")}`;

          return (
            <CardLong
              key={item.track.id}
              item={item.track}
              image={image?.url ?? "/maskable/maskable_icon_x192.png"}
              link={`/${item.track.type}/${item.track.id}`}
              smallInfo={item.track.artists.map((artist) => {
                return (
                  <>
                    <Link
                      href={`/${artist.type}/${artist.id}`}
                      className={`hocus:underline`}
                    >
                      {artist.name}
                    </Link>

                    <span className={`last:hidden`}>, </span>
                  </>
                );
              })}
              secondInfo={
                <Link
                  href={`/${item.track.album.type}/${item.track.album.id}`}
                  className={`hocus:underline`}
                >
                  {item.track.album.name}
                </Link>
              }
              thirdInfo={<div className={`mx-auto w-fit`}>{runtime}</div>}
            />
          );
        })}

      {!loading && data?.items.length > showLimit && (
        <div className={`mt-4 flex justify-center`}>
          <Link
            href={`/me/tracks`}
            className={`btn btn-ghost btn-sm w-full text-primary`}
          >
            Show more
          </Link>
        </div>
      )}
    </div>
  );
}
