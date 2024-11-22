"use client";

import Player from "../Player";
import Navbar from "../Navbar";
import React, { useCallback } from "react";
import SidebarContent from "./Content";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

export default function Sidebar({
  children,
  authorizationURL,
  client_id,
  AUTH_TOKEN,
}) {
  const getOAuthToken = useCallback((callback) => callback(AUTH_TOKEN), []);

  return (
    <WebPlaybackSDK
      initialDeviceName={process.env.NEXT_PUBLIC_APP_NAME}
      getOAuthToken={getOAuthToken}
    >
      <div className={`flex h-dvh flex-col justify-between`}>
        <div className="drawer flex-1 overflow-hidden lg:drawer-open">
          <input id="sidebar" type="checkbox" className="drawer-toggle" />
          <div className={`drawer-content flex min-h-0 flex-col`}>
            {/* Page content here */}
            <div className={`flex-1 overflow-y-auto`}>
              <header
                id="header"
                className={`sticky top-0 z-50 bg-base-100 bg-opacity-80 backdrop-blur-sm`}
              >
                <Navbar
                  authorizationURL={authorizationURL}
                  client_id={client_id}
                />
              </header>

              <main className={`p-4 pt-0`}>{children}</main>
            </div>
          </div>

          {/* Left Sidebar */}
          <div className={`drawer-side absolute inset-y-0 z-50 h-auto`}>
            <label
              htmlFor="sidebar"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            {/* Sidebar content here */}
            <div className="menu h-full min-w-64 max-w-64 flex-nowrap overflow-y-auto bg-base-200 p-4 pt-2 text-base-content lg:bg-base-100">
              <SidebarContent />
            </div>
          </div>
        </div>

        {/* Player */}
        <div className={`relative flex items-center bg-neutral p-2`}>
          <Player />
        </div>
      </div>
    </WebPlaybackSDK>
  );
}
