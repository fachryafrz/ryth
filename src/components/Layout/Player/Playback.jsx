import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  PauseCircle,
  PlayBack,
  PlayCircle,
  PlayForward,
  PlaySkipBack,
  PlaySkipForward,
} from "react-ionicons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import {
  useErrorState,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { playSong } from "@/lib/playback";
import Slider from "@mui/material/Slider";
import { useErrorAlert } from "@/zustand/error-alert";
import { usePlayback } from "@/zustand/playback";

export default function Playback({ isMobile }) {
  // Hooks
  const { user } = useAuth();
  const { track } = usePlayback();
  const router = useRouter();
  const { mutate } = useAuth();
  const webPlaybackSDKReady = useWebPlaybackSDKReady();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();
  const error = useErrorState();
  const { setErrorAlert } = useErrorAlert();

  // State
  const [currentProgress, setCurrentProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  // Ref
  const previousSongRef = useRef(null);
  const playBackRef = useRef(null);
  const playPauseRef = useRef(null);
  const playForwardRef = useRef(null);
  const nextSongRef = useRef(null);
  const endMinutes = durationMs - currentProgress || track?.duration_ms;

  useEffect(() => {
    setCurrentProgress(playback ? playback.position : 0);
    setDurationMs(playback ? playback.duration : 0);
  }, [playback]);

  useEffect(() => {
    let interval;

    if (!playback?.paused && !playback?.loading) {
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
    <div className={`flex flex-col items-end justify-center sm:items-center`}>
      <div className={`flex items-end justify-between lg:w-full`}>
        {/* Start Minutes */}
        <span
          className={`hidden min-w-10 text-xs font-medium text-neutral-500 lg:inline`}
        >
          {convertProgress(currentProgress)}
        </span>

        {/* Playback */}
        <div className={`flex items-center justify-center`}>
          {/* Previous */}
          <button
            ref={previousSongRef}
            onClick={() =>
              error
                ? setErrorAlert(error)
                : playback
                  ? playback.track_window.previous_tracks.length > 0 &&
                    currentProgress < 5e3 // 5 seconds
                    ? player.previousTrack()
                    : player.seek(0)
                  : null
            }
            disabled={!playback}
            className={`btn btn-square btn-ghost btn-sm z-10 !bg-transparent`}
          >
            <PlaySkipBack color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>

          {/* Play Back */}
          <button
            onClick={() =>
              error
                ? setErrorAlert(error)
                : playback
                  ? player.seek(currentProgress - 1e4)
                  : null
            }
            disabled={!playback}
            className={`btn btn-square btn-ghost btn-sm z-10 hidden !bg-transparent sm:inline-flex`}
          >
            <PlayBack color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>

          {/* Play/Pause */}
          <div className={`relative grid place-content-center`}>
            <button
              ref={playPauseRef}
              onClick={() =>
                error
                  ? setErrorAlert(error)
                  : playback
                    ? playback.paused
                      ? player.resume()
                      : player.pause()
                    : playSong({ user, device, uri: track?.uri })
              }
              disabled={!webPlaybackSDKReady || playback?.loading}
              className={`btn btn-square btn-ghost z-10 !bg-transparent`}
            >
              {!playback || playback?.paused ? (
                <PlayCircle color={"#ffffff"} width={`40px`} height={`40px`} />
              ) : (
                <PauseCircle color={"#ffffff"} width={`40px`} height={`40px`} />
              )}
            </button>

            {playback?.loading && (
              <div className={`absolute inset-0 grid place-content-center`}>
                <span className="loading loading-spinner w-[3.5rem]"></span>
              </div>
            )}
          </div>

          {/* Play Forward */}
          <button
            onClick={() =>
              error
                ? setErrorAlert(error)
                : playback
                  ? player.seek(currentProgress + 1e4)
                  : null
            }
            disabled={!playback}
            className={`btn btn-square btn-ghost btn-sm z-10 hidden !bg-transparent sm:inline-flex`}
          >
            <PlayForward color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>

          {/* Next */}
          <button
            ref={nextSongRef}
            onClick={() =>
              error
                ? setErrorAlert(error)
                : playback
                  ? player.nextTrack()
                  : null
            }
            disabled={!playback}
            className={`btn btn-square btn-ghost btn-sm z-10 !bg-transparent`}
          >
            <PlaySkipForward color={"#ffffff"} width={`20px`} height={`20px`} />
          </button>
        </div>

        {/* End Minutes */}
        <span
          className={`hidden min-w-10 text-end text-xs font-medium text-neutral-500 lg:inline`}
        >
          {`-${convertProgress(endMinutes)}`}
        </span>
      </div>

      {/* Progress Bar */}
      {/* <div className={`absolute inset-x-0 -top-2 w-full lg:static`}> */}
      <Slider
        aria-label="time-indicator"
        size="small"
        value={currentProgress}
        min={0}
        step={1}
        max={durationMs}
        onChange={(_, value) => setCurrentProgress(value)}
        onChangeCommitted={(_, value) => player.seek(value)}
        valueLabelDisplay={isMobile ? "auto" : "off"}
        valueLabelFormat={(value) => convertProgress(value)}
        disabled={!playback}
        className={`!absolute !inset-x-0 !-top-2 !py-2 lg:!relative lg:!top-auto`}
        sx={(t) => ({
          color: "#ff6337",
          height: 4,
          "&:hover": {
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
            },
          },
          "& .MuiSlider-thumb": {
            width: 0,
            height: 0,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&::before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${"#ff633729"}`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
            "&:after": {
              display: "none",
            },
          },
          "& .MuiSlider-rail": {
            opacity: 1,
            background: "#282828",
          },
          "& .MuiSlider-valueLabel": {
            background: "#161616",
          },
        })}
      />
      {/* </div> */}
    </div>
  );
}
