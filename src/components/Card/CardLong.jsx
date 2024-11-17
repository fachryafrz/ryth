"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { EllipsisVertical, Play } from "react-ionicons";
import TrackCard from "../Track/Card";
import Link from "next/link";
import numeral from "numeral";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";

export default function CardLong({
  item,
  link,
  image,
  name,
  secondInfo,
  thirdInfo,
  smallInfo,
  cta = true,
  hover = true,
}) {
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();

  const playSong = async () => {
    if (device === null) return;

    await fetchData(`/me/player/play`, {
      params: {
        device_id: device.device_id,
      },
      method: "PUT",
      data: JSON.stringify(
        item.type === "album" || item.type === "playlist"
          ? { context_uri: item.uri }
          : { uris: [item.uri] },
      ),
    });
  };
  return (
    <div
      className={`grid grid-cols-6 items-center gap-2 @lg:grid-cols-12 ${hover ? `hocus:rounded-lg hocus:bg-neutral` : ``}`}
    >
      {/* Image, Title */}
      <div
        className={`col-span-4 ${secondInfo && thirdInfo ? `@lg:col-span-5` : secondInfo || thirdInfo ? `@lg:col-span-8` : ``} ${cta ? `@lg:col-span-10` : `col-span-6 @lg:col-span-12`}`}
      >
        <TrackCard
          name={
            name ?? (
              <Link href={link} className={`${hover ? `hocus:underline` : ``}`}>
                {item.name}
              </Link>
            )
          }
          image={image}
          info={smallInfo}
        />
      </div>

      {/* Second Info */}
      {secondInfo && (
        <div
          className={`col-span-2 hidden justify-center @lg:col-span-3 @lg:flex`}
        >
          <span className={`line-clamp-1 w-full text-sm font-medium`}>
            {secondInfo}
          </span>
        </div>
      )}

      {/* Third Info */}
      {thirdInfo && (
        <div className={`col-span-2 hidden justify-center @lg:flex`}>
          <span className={`line-clamp-1 w-full text-sm font-medium`}>
            {thirdInfo}
          </span>
        </div>
      )}

      {/* Play, Options */}
      {cta && item.type !== "artist" && (
        <div
          className={`col-span-2 col-start-5 flex justify-end pr-1 @lg:col-start-12`}
        >
          <button
            onClick={playSong}
            className={`btn btn-square btn-ghost btn-sm`}
          >
            <Play color={`#ffffff`} width={`20px`} height={`20px`} />
          </button>
          {/* <button className={`btn btn-square btn-ghost btn-sm`}>
            <EllipsisVertical
              color={`#ffffff`}
              width={`20px`}
              height={`20px`}
            />
          </button> */}
        </div>
      )}
    </div>
  );
}
