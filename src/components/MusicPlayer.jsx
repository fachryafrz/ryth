import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import data from "../json/track.json";

export default function MusicPlayer() {
  const minutes = Math.floor(data.duration / 60);
  const seconds = data.duration % 60;

  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleRestartSong = () => {
    // setCurrentSongIndex(
    //   currentSongIndex === 0 ? musicData.length - 1 : currentSongIndex - 1
    // );
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
  };

  const handleNextSong = () => {
    setCurrentSongIndex(
      currentSongIndex === musicData.length - 1 ? 0 : currentSongIndex + 1
    );
    handlePlay();
  };

  const handleSeek = (event) => {
    audioRef.current.currentTime = event.target.value;
    setCurrentTime(event.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = ("0" + minutes).slice(-2);
    const formattedSeconds = ("0" + seconds).slice(-2);
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    document.title = isPlaying
      ? `${data.title} - ${data.artist}`
      : import.meta.env.VITE_APP_NAME;
  }, [isPlaying]);

  return (
    <div className={`bg-gray-800 p-2 rounded-lg flex flex-col gap-2`}>
      <audio src={data.file_path} ref={audioRef}></audio>
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
        <time className={`text-sm text-gray-400 font-medium`}>
          {formatTime(currentTime)}
        </time>
        <input
          type="range"
          min="0"
          max={data.duration}
          value={currentTime}
          onChange={handleSeek}
          className={`w-full h-[2px]`}
        />
        <time className={`text-sm text-gray-400 font-medium`}>
          {formatTime(data.duration)}
        </time>
      </div>
      <div id="playerActions" className={`flex items-center justify-between`}>
        <button
          onClick={!isPlaying ? handlePlay : handlePause}
          className={`bg-white text-gray-900 order-3`}
        >
          <IonIcon icon={!isPlaying ? Icon.play : Icon.pause} />
        </button>
        <button className={`order-4`}>
          <IonIcon icon={Icon.playSkipForward} />
        </button>
        <button onClick={handleRestartSong} className={`order-2`}>
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
