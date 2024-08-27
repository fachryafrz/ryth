"use client";

import { useAuth } from "@/hooks/auth";
import { spotify_show_dialog } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Login({ authorizationURL, client_id, redirect_uri }) {
  const { login } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const showDialog = localStorage.getItem(spotify_show_dialog);

  const state = generateRandomString(16);
  const scope = [
    "user-read-email",
    "user-read-private",
    "user-top-read",
    "user-follow-read",
    "user-library-read",
    "user-read-playback-state",
    "user-modify-playback-state",
  ].join(" ");

  const handleLogin = () => {
    current.set("client_id", client_id);
    current.set("response_type", "code");
    current.set("redirect_uri", redirect_uri);
    current.set("scope", scope);
    current.set("state", state);
    current.set("show_dialog", showDialog);

    router.push(`${authorizationURL}?${current.toString()}`);
  };

  useEffect(() => {
    if (!localStorage.getItem(spotify_show_dialog)) {
      localStorage.setItem(spotify_show_dialog, "true");
    }

    if (current.has("code")) {
      const code = current.get("code");

      login({ code });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, pathname]);

  return (
    <div>
      <button onClick={handleLogin} className={`btn btn-sm`}>
        Login
      </button>
    </div>
  );
}