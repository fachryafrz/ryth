import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import data from "../json/topTracks.json";

export default function TrackList({ setShowPlayer, setCurrentTrack }) {
  const handlePlaying = () => {
    setShowPlayer(true);
    setCurrentTrack(true);
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <h3 className={`pl-2 text-2xl font-medium`}>Top Musics</h3>
      <ul>
        {data.map((item, index) => {
          const minutes = Math.floor(item.duration / 60);
          const seconds = item.duration % 60;

          return (
            <li
              key={index}
              id="listMusic"
              className={`border-b border-neutral-400`}
            >
              <div className={`flex items-center `}>
                <button
                  onClick={handlePlaying}
                  className={`grid w-full grid-cols-4 items-center gap-2 p-2`}
                >
                  <div
                    className={`col-span-2 flex items-center gap-2 sm:gap-4`}
                  >
                    <figure
                      className={`aspect-square min-w-[30px] max-w-[30px] sm:max-w-[50px]`}
                    >
                      <img src={item.img_path} alt={item.artist} />
                    </figure>
                    <h4 className={`text-left line-clamp-2`}>{item.title}</h4>
                  </div>
                  <span
                    className={`text-sm font-medium text-neutral-400 line-clamp-1`}
                  >
                    {item.artist}
                  </span>
                  <time className={`text-sm font-medium text-neutral-400`}>
                    {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                  </time>
                </button>
                <button className={`ml-auto flex p-2`}>
                  <IonIcon
                    icon={!item.favorite ? Icon.heartOutline : Icon.heart}
                  />
                </button>
                <button
                  className={`flex rounded p-2 hover:bg-white hover:bg-opacity-10`}
                >
                  <IonIcon icon={Icon.ellipsisVertical} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
