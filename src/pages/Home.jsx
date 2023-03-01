import { useState } from "react";
import { Discover, TrackList, MusicPlayer } from "../components/Components";

export default function Home({
  showPlayer,
  setShowPlayer,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
}) {
  return (
    <div className={`${!showPlayer ? null : `pb-[5rem]`}`}>
      <Discover />
      <div className={`p-4 max-w-5xl mx-auto`}>
        <div>
          <TrackList
            setShowPlayer={setShowPlayer}
            setCurrentTrack={setCurrentTrack}
          />
        </div>
      </div>
      <MusicPlayer
        currentTrack={currentTrack}
        showPlayer={showPlayer}
        setShowPlayer={setShowPlayer}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}
