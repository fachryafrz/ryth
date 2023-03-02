import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

export default function TrackCard({ item, songList }) {
  const handleAddSong = () => {
    const existingTitle = songList.find((i) => i.title === item.title);

    if (!existingTitle) {
      songList.push(item);
    } else {
      return false;
    }
  };

  return (
    <button
      id="trackCard"
      onClick={handleAddSong}
      className={`relative rounded-lg overflow-hidden`}
    >
      <figure className={`aspect-square transition-all`}>
        <img src={item.img_path} alt={item.title} />
      </figure>
      <div
        id="playIcon"
        className={`opacity-0 absolute inset-0 grid place-items-center transition-all`}
      >
        <div
          className={`grid place-items-center p-4 rounded-full bg-gray-800 bg-opacity-70 max-w-fit`}
        >
          <IonIcon icon={Icon.play} />
        </div>
      </div>
      <div
        id="contents"
        className={`text-left absolute inset-x-0 bottom-0 translate-y-full bg-gray-900 bg-opacity-50 p-2 backdrop-blur transition-all`}
      >
        <h3 title={item.title} className={`line-clamp-1 font-medium`}>
          {item.title}
        </h3>
        <span className={`line-clamp-1 text-sm font-medium text-gray-400`}>
          {item.artist}
        </span>
      </div>
    </button>
  );
}
