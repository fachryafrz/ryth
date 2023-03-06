import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

export default function TrackCard({ item, songList, setSongList }) {
  const handleAddSong = () => {
    // const existingTitle = songList.find((i) => i.title === item.title);

    // if (!existingTitle) {
    //   setSongList(item);
    // } else {
    //   return false;
    // }

    setSongList(item);
  };

  return (
    <button
      id="trackCard"
      onClick={handleAddSong}
      className={`relative w-full overflow-hidden rounded-3xl before:absolute before:inset-0 before:z-10 before:bg-gradient-to-t before:from-neutral-900`}
    >
      <figure className={`aspect-image transition-all`}>
        <img src={item.img_path} alt={item.title} />
      </figure>
      <div
        id="playIcon"
        className={`absolute inset-0 z-20 grid place-items-center opacity-0 transition-all`}
      >
        <div
          className={`grid max-w-fit place-items-center rounded-full bg-neutral-800/70 p-4`}
        >
          <IonIcon icon={Icon.play} />
        </div>
      </div>
      <div
        id="contents"
        className={`absolute inset-x-0 bottom-0 z-20 bg-opacity-50 p-4 pt-12 text-left transition-all`}
      >
        <h3
          title={item.title}
          className={`font-medium line-clamp-1 sm:text-xl`}
        >
          {item.title}
        </h3>
        <span
          className={`text-sm font-medium text-neutral-400 line-clamp-1 sm:text-base`}
        >
          {item.artist}
        </span>
      </div>
    </button>
  );
}
