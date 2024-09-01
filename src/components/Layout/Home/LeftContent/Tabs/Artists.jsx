import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { checkToken } from "@/helper/checkToken";
import { userStore } from "@/zustand/user";
import axios from "axios";
import numeral from "numeral";
import React, { useEffect, useState } from "react";

export default function TabArtists() {
  const { user } = userStore();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.items.length);
  };

  useEffect(() => {
    if (!user) return;

    const fetchCurrentUserFollowedArtists = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/api/me/top/artists`);
      setIsLoading(false);

      setData(data);
    };

    checkToken(fetchCurrentUserFollowedArtists);
  }, [user]);

  return (
    <div>
      {isLoading && (
        <div className={`flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} info={false} />
          ))}
        </div>
      )}

      {!isLoading &&
        data?.items.length > 0 &&
        data.items.slice(0, 5).map((artist, i) => {
          const image = artist.images[0].url;
          const followers = numeral(artist.followers.total).format(`0a`);

          return (
            <CardLong
              key={artist.id}
              item={artist}
              image={image}
              link={`/artist/${artist.id}`}
              secondInfo={artist.genres.slice(0, 2).join(", ")}
              thirdInfo={`${followers} folllowers`}
            />
          );
        })}

      {!isLoading && data?.items.length > showLimit && (
        <div className={`mt-4 flex justify-center`}>
          <button
            onClick={handleShowMore}
            className={`btn btn-ghost btn-sm w-full text-primary`}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
