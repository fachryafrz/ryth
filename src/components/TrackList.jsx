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
      <h3 className={`text-2xl font-medium pl-2`}>Top Musics</h3>
      <ul>
        {data.map((item, index) => {
          const minutes = Math.floor(item.duration / 60);
          const seconds = item.duration % 60;

          return (
            <li
              key={index}
              id="listMusic"
              className={`border-b border-gray-400`}
            >
              <div className={`flex items-center `}>
                <button
                  onClick={handlePlaying}
                  className={`p-2 grid grid-cols-4 gap-2 items-center w-full`}
                >
                  <div
                    className={`flex items-center gap-2 sm:gap-4 col-span-2`}
                  >
                    <figure
                      className={`min-w-[30px] max-w-[30px] sm:max-w-[50px] aspect-square`}
                    >
                      <img src={item.img_path} alt={item.artist} />
                    </figure>
                    <h4 className={`line-clamp-2 text-left`}>{item.title}</h4>
                  </div>
                  <span
                    className={`text-sm text-gray-400 font-medium line-clamp-1`}
                  >
                    {item.artist}
                  </span>
                  <time className={`text-sm text-gray-400 font-medium`}>
                    {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                  </time>
                </button>
                <button className={`ml-auto p-2 flex`}>
                  <IonIcon
                    icon={!item.favorite ? Icon.heartOutline : Icon.heart}
                  />
                </button>
                <button
                  className={`p-2 flex hover:bg-white hover:bg-opacity-10 rounded`}
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
