import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import data from "../json/track.json";

export default function MusicPlayer() {
  const minutes = Math.floor(data.duration / 60);
  const seconds = data.duration % 60;

  return (
    <div className={`bg-gray-800 p-2 rounded-lg flex flex-col gap-2 mt-auto`}>
      <figure
        className={`aspect-square rounded-lg overflow-hidden max-w-[250px]`}
      >
        <img src={data.img_path} alt={data.title} />
      </figure>
      <div className={`text-center`}>
        <h2 className={`line-clamp-1 font-medium text-lg`}>{data.title}</h2>
        <span className={`line-clamp-1 text-sm text-gray-400 font-medium`}>
          {data.artist}
        </span>
      </div>
      <div className={`flex items-center gap-2`}>
        <time className={`text-sm text-gray-400 font-medium`}>0:00</time>
        <input type="range" step={0.01} className={`w-full`} />
        <time className={`text-sm text-gray-400 font-medium`}>{`${minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</time>
      </div>
      <div id="playerActions" className={`flex items-center justify-between`}>
        <button className={`bg-white text-gray-900 order-3`}>
          <IonIcon icon={Icon.play} />
        </button>
        <button className={`order-4`}>
          <IonIcon icon={Icon.playSkipForward} />
        </button>
        <button className={`order-2`}>
          <IonIcon icon={Icon.playSkipBack} />
        </button>
        <button className={`order-1`}>
          <IonIcon icon={Icon.repeat} />
        </button>
        <button className={`order-5`}>
          <IonIcon icon={Icon.shuffle} />
        </button>
      </div>
    </div>
  );
}
