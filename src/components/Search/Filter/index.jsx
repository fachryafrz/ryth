"use client";

import { Options } from "react-ionicons";
import Acousticness from "./Acousticness";
import Danceability from "./Danceability";
import Duration from "./Duration";
import Energy from "./Energy";
import Instrumentalness from "./Instrumentalness";
import Key from "./Key";
import Liveness from "./Liveness";
import Loudness from "./Loudness";
import Mode from "./Mode";
import Popularity from "./Popularity";
import Speechiness from "./Speechiness";
import Tempo from "./Tempo";
import TimeSignature from "./TimeSignature";
import Valence from "./Valence";
import Genre from "./Genre";
import Market from "./Market";
import Artist from "./Artist";
import Track from "./Track";
import { useFilterToggle } from "@/zustand/filterToggle";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

export default function Filter({ markets, genres }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filterToggle } = useFilterToggle();
  const { setIsRequired } = useRequiredFilter();

  useEffect(() => {
    const requiredFilter = ["seed_artists", "seed_genres", "seed_tracks"];
    const hasSomeFilter = requiredFilter.some((param) =>
      searchParams.has(param),
    );

    if (hasSomeFilter) {
      setIsRequired(false);
    } else {
      router.push("/search");
      setIsRequired(true);
    }
  }, [searchParams]);

  return (
    <div
      className={`fixed left-0 z-10 max-h-[calc(100dvh-(64px+64px+80px))] w-full flex-1 space-y-2 overflow-y-auto bg-neutral bg-opacity-95 p-4 backdrop-blur transition-all duration-300 sm:left-4 sm:max-h-[calc(100dvh-(64px+64px+84px+0.5rem))] sm:max-w-[300px] sm:rounded-2xl lg:left-auto xl:sticky xl:top-[calc(64px+0.5rem)] xl:max-h-[calc(100dvh-(64px+64px+84px+1.5rem))] ${filterToggle ? "-translate-x-0 opacity-100 xl:ml-0" : "-translate-x-[calc(100%+1rem)] opacity-0 xl:-ml-[calc(300px+1rem)]"}`}
    >
      <Artist />
      <Genre data={genres} />
      <Track />
      <Market data={markets} />
      <Valence />
      <Acousticness />
      <Danceability />
      <Duration />
      <Energy />
      <Instrumentalness />
      <Key />
      <Liveness />
      <Loudness />
      <Mode />
      <Popularity />
      <Speechiness />
      <Tempo />
      <TimeSignature />
    </div>
  );
}

export function FilterMenuToggle() {
  const { filterToggle, setFilterToggle } = useFilterToggle();

  return (
    <button
      onClick={() => setFilterToggle(!filterToggle)}
      className={`btn btn-primary rounded-full`}
    >
      <Options color={`#ffffff`} />

      <h2 className={`font-medium`}>Tune</h2>
    </button>
  );
}
