import CardLong from "@/components/Card/CardLong";
import DetailsHero from "@/components/Layout/Details/Hero";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import { isPlural } from "@/lib/isPlural";
import { fetchData } from "@/server/actions";
import moment from "moment";
import Link from "next/link";
import numeral from "numeral";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;

  const { data: playlist } = await fetchData(`/playlists/${id}`);
  const [image] = playlist.images;

  return {
    title: playlist.name,
    description: playlist.description,
    openGraph: {
      title: `${playlist.name} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
      images: [image?.url ?? "/maskable/maskable_icon_x192.png"],
    },
  };
}

export default async function page({ params }) {
  const { id } = params;

  const { data: playlist } = await fetchData(`/playlists/${id}`);
  const [image] = playlist.images;

  return (
    <div className={`flex flex-col gap-4`}>
      {/* Hero */}
      <section>
        <DetailsHero
          item={playlist}
          image={image?.url ?? "/maskable/maskable_icon_x192.png"}
          title={playlist.name}
          type={`Playlist`}
          secondInfo={
            <div className={`flex flex-col items-start`}>
              <div>
                <span>By: </span>

                <Link
                  href={`/user/${playlist.owner.id}`}
                  className={`font-medium hocus:underline`}
                >
                  {playlist.owner.display_name}
                </Link>
              </div>

              {playlist.followers.total > 0 && (
                <div>
                  <span>
                    {numeral(playlist.followers.total).format(`0,0`)}{" "}
                    {isPlural(
                      playlist.followers.total,
                      `follower`,
                      `followers`,
                    )}
                  </span>
                </div>
              )}
            </div>
          }
        />
      </section>

      {/* Tracks */}
      <section>
        <div>
          <header className={`flex items-center gap-4`}>
            <span className={`w-5 text-center`}>#</span>

            <div className={`flex-grow @container`}>
              <CardLong
                name={
                  <h2 className={`text-xl font-medium`}>
                    {isPlural(playlist.tracks.items.length, `Song`, `Songs`)}
                  </h2>
                }
                secondInfo={<div className={`mx-auto w-fit`}>Duration</div>}
                thirdInfo={` `}
                cta={false}
                hover={false}
              />
            </div>
          </header>

          <span className={`divider my-0`}></span>

          <ul>
            {playlist.tracks.items.map((item, j) => {
              if (item.track) {
                return (
                  <li
                    key={item.id}
                    className={`flex items-center gap-4 hocus:rounded-lg hocus:bg-neutral`}
                  >
                    <span className={`flex w-5 justify-center`}>{j + 1}</span>

                    <div className={`flex-grow @container`}>
                      <CardLong
                        item={item.track}
                        image={item.track.album.images[0]?.url}
                        link={`/${item.track.type}/${item.track.id}`}
                        secondInfo={
                          <div className={`mx-auto w-fit`}>
                            {moment(item.track.duration_ms).format("m:ss")}
                          </div>
                        }
                        thirdInfo={` `}
                        smallInfo={item.track.artists.map((artist) => {
                          return (
                            <>
                              <Link
                                key={artist.id}
                                href={`/${artist.type}/${artist.id}`}
                                className={`hocus:underline`}
                              >
                                {artist.name}
                              </Link>

                              <span className={`last:hidden`}>, </span>
                            </>
                          );
                        })}
                      />
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
