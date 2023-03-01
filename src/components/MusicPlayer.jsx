import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import React, { useState } from "react";
import data from "../json/track.json";

export default function MusicPlayer({
  currentTrack,
  showPlayer,
  setShowPlayer,
  isPlaying,
  setIsPlaying,
}) {
  const handlePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`${
        !showPlayer
          ? `fixed inset-x-0 bottom-1 translate-y-full`
          : `opacity-100 pointer-events-auto fixed inset-x-0 bottom-0`
      } z-20 flex flex-col transition-all duration-500`}
    >
      <input
        type="range"
        step={0.01}
        className={`${!currentTrack ? `hidden` : `block`} h-1 z-10`}
      />

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 p-4 sm:px-6 bg-neutral-900 bg-opacity-70 backdrop-blur-sm z-0`}
      >
        <div className="flex items-center gap-2">
          <figure className={`min-w-[50px] max-w-[50px] aspect-square`}>
            <img src={data.img_path} alt={data.artist} />
          </figure>
          <div className={`flex flex-col`}>
            <span className={`font-medium line-clamp-1`}>{data.title}</span>
            <span className={`text-sm text-gray-400 font-medium line-clamp-1`}>
              {data.artist}
            </span>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 justify-end sm:justify-center`}
        >
          <button className={`grid place-items-center max-w-fit`}>
            <IonIcon icon={Icon.playSkipBack} />
          </button>
          <button
            onClick={handlePlay}
            className={`grid place-items-center max-w-fit p-3 rounded-full bg-white text-neutral-900`}
          >
            <IonIcon icon={!isPlaying ? Icon.play : Icon.pause} />
          </button>
          <button className={`grid place-items-center max-w-fit`}>
            <IonIcon icon={Icon.playSkipForward} />
          </button>
        </div>
        <div className={`hidden sm:flex items-center gap-2 justify-end`}>
          <div className={`text-sm text-gray-400 font-medium`}>
            <time>0:18</time>
            <span>/</span>
            <time>4:30</time>
          </div>
          <div className={`flex items-center max-w-[100px]`}>
            <button className={`grid place-items-center`}>
              <IonIcon icon={Icon.volumeMedium} />
            </button>
            <input type="range" step={10} className={`w-full`} />
          </div>
        </div>
      </div>
    </div>
  );
}
