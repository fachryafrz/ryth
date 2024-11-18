import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  PauseCircle,
  PlayCircle,
  PlaySkipBack,
  PlaySkipForward,
} from "react-ionicons";
import { useHandleError } from "@/hooks/error";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";
import { playSong } from "@/lib/play-song";

export default function Playback({ track }) {
  const { user } = useAuth();
  const router = useRouter();

  const { mutate } = useAuth();
  // const { playback, setPlayback } = usePlayback();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();

  const [currentProgress, setCurrentProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  // Ref
  const previousSongRef = useRef(null);
  const playPauseRef = useRef(null);
  const nextSongRef = useRef(null);

  useEffect(() => {
    setCurrentProgress(playback ? playback.position : 0);
    setDurationMs(playback ? playback.duration : 0);
  }, [playback]);

  useEffect(() => {
    let interval;

    if (!playback?.paused) {
      interval = setInterval(() => {
        if (playback?.position !== undefined) {
          setCurrentProgress((prevProgress) => prevProgress + 1000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [playback?.paused, playback?.position]);

  const convertProgress = (progress) => {
    if (!user) return "0:00";

    const minutes = moment(progress).format("m");
    const seconds = moment(progress).format("ss");

    return `${minutes}:${seconds}`;
  };

  const calculateProgressPercentage = (progress, duration) => {
    if (!user) return 0;
    return (progress / duration) * 100;
  };

  const { handleError } = useHandleError();

  // Login Alert
  const handleLoginAlert = () => {
    document.getElementById(`loginAlert`).showModal();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " " && document.activeElement.tagName !== "INPUT") {
        event.preventDefault();
        playPauseRef.current.click();
      }

      // NOTE: Shortcut for Previous and Next song (Currently not working)
      // if (event.key === "Shift" && event.key === "n") {
      //   nextSongRef.current.click();
      // }

      // if (event.key === "Shift" && event.key === "p") {
      //   previousSongRef.current.click();
      // }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center sm:flex-row`}>
      <div className={`flex items-center justify-center`}>
        {/* Previous */}
        <button
          ref={previousSongRef}
          onClick={async () =>
            !user
              ? handleLoginAlert()
              : error
                ? document.getElementById("premiumAlert").showModal()
                : playback
                  ? await player.previousTrack()
                  : null
          }
          className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
        >
          <PlaySkipBack color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>

        {/* Play/Pause */}
        <button
          ref={playPauseRef}
          onClick={async () =>
            error
              ? document.getElementById("premiumAlert").showModal()
              : playback
                ? playback.paused
                  ? await player.resume()
                  : await player.pause()
                : playSong(user, device, "track", track.uri)
          }
          className={`btn btn-square btn-ghost !bg-transparent`}
        >
          {!playback || playback?.paused ? (
            <PlayCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          ) : (
            <PauseCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          )}
        </button>

        {/* Next */}
        <button
          ref={nextSongRef}
          onClick={async () =>
            !user
              ? handleLoginAlert()
              : error
                ? document.getElementById("premiumAlert").showModal()
                : playback
                  ? await player.nextTrack()
                  : null
          }
          className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
        >
          <PlaySkipForward color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>
      </div>

      {/* Progress */}
      <div className={`flex items-center gap-4 sm:ml-4 sm:w-full`}>
        {/* Progress Bar */}
        <div
          className={`absolute inset-x-0 top-0 h-1 w-full rounded-full bg-neutral-600 lg:static`}
        >
          <div
            className={`h-full rounded-full bg-primary`}
            style={{
              width: `${calculateProgressPercentage(currentProgress, durationMs || 1)}%`,
            }}
          ></div>
        </div>

        {/* Minutes */}
        <span className={`text-sm font-medium text-neutral-500`}>
          {`${convertProgress(currentProgress)}/${convertProgress(durationMs || 0)}`}
        </span>
      </div>
    </div>
  );
}
