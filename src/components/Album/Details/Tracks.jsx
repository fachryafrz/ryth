"use client";

import CardLong from "@/components/Card/CardLong";
import moment from "moment";
import { DiscOutline } from "react-ionicons";

export default function AlbumDetailsTracks({ album, disc }) {
  const discNumber = album.tracks.items.every((item) => item.disc_number === 1);

  return (
    <div>
      <header className={`flex items-center gap-4`}>
        <DiscOutline color={`#ffffff`} width={`20px`} height={`20px`} />

        <h2 className={`text-xl font-medium`}>
          {discNumber ? `Tracks` : `Disc ${disc}`}
        </h2>
      </header>

      <span className={`divider my-0`}></span>

      <ul>
        {album.tracks.items.map((item, j) => {
          return (
            item.disc_number === disc && (
              <li key={item.id} className={`flex items-center gap-4`}>
                <span className={`flex w-5 justify-center`}>{item.track_number}</span>

                <div className={`-mx-1 flex-grow @container`}>
                  <CardLong
                    item={item}
                    link={`/${item.type}/${item.id}`}
                    secondInfo={moment(item.duration_ms).format("m:ss")}
                    smallInfo={item.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  />
                </div>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
