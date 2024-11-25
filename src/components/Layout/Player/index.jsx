"use client";

/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackCard from "../../Track/Card";
import Playback from "./Playback";
import LoadingCard from "@/components/Loading/Card";
import PlaybackOptions from "./Options";
import { usePlayback } from "@/zustand/playback";
import { useQueue } from "@/zustand/queue";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
  useWebPlaybackSDKReady,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";
import { useAuth } from "@/hooks/auth";
import PlayerInfo from "./Info";

export default function Player() {
  // State
  const [volumeState, setVolumeState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState();

  // Hooks
  const { user } = useAuth();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();

  const { refetch: refetchRecentlyPlayed } = useQuery({
    enabled: false,
    queryKey: `/me/player/recently-played`,
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey).then(({ data }) => data);
    },
  });

  useEffect(() => {
    const volumeStateLocalStorage = Number(
      localStorage.getItem("volume-state"),
    );
    if (volumeStateLocalStorage) {
      setVolumeState(volumeStateLocalStorage);
    } else {
      setVolumeState(100);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const handleRefetchRecentlyPlayed = async () => {
      const { data } = await refetchRecentlyPlayed();
      setRecentlyPlayed(data.items[0].track);
    };

    handleRefetchRecentlyPlayed();
  }, [user]);

  useEffect(() => {
    if (!playback) return;

    const volumeStateLocalStorage = Number(
      localStorage.getItem("volume-state"),
    );

    const handleSetPlaybackVolume = async () => {
      await fetchData(`/me/player/volume`, {
        method: "PUT",
        params: {
          volume_percent: volumeStateLocalStorage || 100,
          device_id: device.id,
        },
      });
    };

    handleSetPlaybackVolume();
  }, [playback, device]);

  // useEffect(() => {
  //   const isMobileDevice = () => {
  //     const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  //     // Windows Phone must come first because its UA also contains "Android"
  //     if (/windows phone/i.test(userAgent)) {
  //       setVolumeState(100);
  //       return true;
  //     }

  //     if (/android/i.test(userAgent)) {
  //       setVolumeState(100);
  //       return true;
  //     }

  //     // iOS detection from: http://stackoverflow.com/a/9039885/177710
  //     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //       setVolumeState(100);
  //       return true;
  //     }

  //     return false;
  //   };

  //   setIsMobile(isMobileDevice());
  // }, []);

  useEffect(() => {
    if (!playback) return;

    const DEFAULT_SKIP_TIME = 1e4; // 10 seconds

    const currentTrack = playback.track_window.current_track;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.name,
      artist: currentTrack.artists.map((artist) => artist.name).join(", "),
      album: currentTrack.album.name,
      artwork: [
        {
          src: currentTrack.album.images[0].url,
          sizes: "640x640",
          type: "image/jpeg",
        },
      ],
    });

    // Optional: Add Media Session Controls
    navigator.mediaSession.setActionHandler("play", () => player.resume());
    navigator.mediaSession.setActionHandler("pause", () => player.pause());
    navigator.mediaSession.setActionHandler("nexttrack", () =>
      player.nextTrack(),
    );
    navigator.mediaSession.setActionHandler("previoustrack", () =>
      player.previousTrack(),
    );
    navigator.mediaSession.setActionHandler("seekbackward", (details) => {
      const skipTime = details.seekOffset || DEFAULT_SKIP_TIME;
      player.seek(playback.position - skipTime);
    });
    navigator.mediaSession.setActionHandler("seekforward", (details) => {
      const skipTime = details.seekOffset || DEFAULT_SKIP_TIME;
      player.seek(playback.position + skipTime);
    });
  }, [playback]);

  return (
    <div
      id="player"
      className={`grid w-full grid-cols-3 items-center gap-2 sm:gap-4`}
    >
      {/* Toggle Mobile Player */}
      <div
        onClick={() => document.getElementById("mobilePlayer").showModal()}
        className={`absolute inset-0 z-0 sm:hidden`}
      ></div>

      {/* Track Info (Image, Title, Artist) */}
      <div className={`col-span-2 sm:col-span-1`}>
        <PlayerInfo
          track={playback?.track_window?.current_track ?? recentlyPlayed}
        />
      </div>

      {/* Playback (Play, Pause, Next, Previous, Runtime) */}
      <div className={``}>
        <Playback
          track={playback?.track_window?.current_track ?? recentlyPlayed}
          isMobile={isMobile}
        />
      </div>

      {/* Options (Volume, Shuffle, Repeat) */}
      <div className={`hidden sm:block`}>
        <PlaybackOptions
          volumeState={volumeState}
          setVolumeState={setVolumeState}
        />
      </div>
    </div>
  );
}
