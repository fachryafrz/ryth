import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import data from "../json/track.json";

export default function MusicPlayer({ songList, setSongList }) {
  const audioRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleAudioCanPlay = () => {
    if (isPlaying) {
      handlePlay();
    }
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleRestartSong = () => {
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex(
      currentSongIndex === 0 ? songList.length - 1 : currentSongIndex - 1
    );
    handlePlay();
  };

  const handleNextSong = () => {
    setCurrentSongIndex(
      currentSongIndex === songList.length - 1 ? 0 : currentSongIndex + 1
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

  const currentSong = songList;

  useEffect(() => {
    document.title = isPlaying
      ? `${currentSong && currentSong.title} - ${
          currentSong && currentSong.artist
        }`
      : import.meta.env.VITE_APP_NAME;

    const intervalId = setInterval(() => {
      setCurrentTime(audioRef.current.currentTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentSong, isPlaying]);

  return (
    <div className={`w-full fixed inset-x-0 bottom-0 xl:static`}>
      {Object.keys(currentSong).length > 0 && (
        <input
          type="range"
          min="0"
          max={audioRef.current && audioRef.current.duration}
          value={currentTime}
          onChange={handleSeek}
          className={`w-full h-[2px] xl:hidden absolute inset-x-0 top-0 z-10`}
        />
      )}
      {Object.keys(currentSong).length > 0 ? (
        <div
          className={`bg-gray-800 bg-opacity-70 backdrop-blur w-full p-4 xl:rounded-lg flex xl:flex-col items-center gap-2`}
        >
          <audio
            src={currentSong && currentSong.file_path}
            onCanPlay={handleAudioCanPlay}
            onEnded={handleNextSong}
            ref={audioRef}
          ></audio>
          <figure
            className={`aspect-square rounded-lg overflow-hidden max-w-[50px] xl:max-w-[250px]`}
          >
            <img
              src={currentSong && currentSong.img_path}
              alt={currentSong && currentSong.title}
            />
          </figure>
          <div className={`xl:text-center`}>
            <h2 className={`line-clamp-1 font-medium text-lg`}>
              {currentSong && currentSong.title}
            </h2>
            <span className={`line-clamp-1 text-sm text-gray-400 font-medium`}>
              {currentSong && currentSong.artist}
            </span>
          </div>
          <div className={`flex items-center gap-1 xl:gap-2 ml-auto xl:ml-0`}>
            <time className={`text-sm text-gray-400 font-medium`}>
              {formatTime(currentTime)}
            </time>
            <input
              type="range"
              min="0"
              max={audioRef.current && audioRef.current.duration}
              value={currentTime}
              onChange={handleSeek}
              className={`w-full h-[2px] hidden xl:block`}
            />
            <span className={`text-sm text-gray-400 font-medium xl:hidden`}>
              /
            </span>
            <time className={`text-sm text-gray-400 font-medium`}>
              {formatTime(audioRef.current && audioRef.current.duration)}
            </time>
          </div>
          <div
            id="playerActions"
            className={`flex items-center justify-between`}
          >
            <button
              onClick={!isPlaying ? handlePlay : handlePause}
              className={`bg-white text-gray-900 order-3`}
            >
              <IonIcon icon={!isPlaying ? Icon.play : Icon.pause} />
            </button>
            <button onClick={handleNextSong} className={`order-4`}>
              <IonIcon icon={Icon.playSkipForward} />
            </button>
            <button
              onClick={currentTime < 1 ? handlePreviousSong : handleRestartSong}
              className={`order-2`}
            >
              <IonIcon icon={Icon.playSkipBack} />
            </button>
            <button className={`order-1 !hidden xl:!flex`}>
              <IonIcon icon={Icon.repeat} />
            </button>
            <button className={`order-5 !hidden xl:!flex`}>
              <IonIcon icon={Icon.shuffle} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
