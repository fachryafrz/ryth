import LeftContent from "@/components/Layout/Home/LeftContent";
import RightContent from "@/components/Layout/Home/RightContent";
import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const revalidate = 3600;

export default async function Home() {
  const cookiesStore = cookies();

  if (!cookiesStore.has(spotify_access_token)) {
    return redirect(`/login`);
  }

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  // Left Content
  const {
    data: { categories },
  } = await axios.get(`${process.env.API_URL}/browse/categories`, {
    headers: headers,
  });

  const categoriesPlaylists = [];

  for (const item of categories.items) {
    const { id } = item;

    const { data } = await axios.get(
      `${process.env.API_URL}/browse/categories/${id}/playlists`,
      { headers: headers },
    );

    categoriesPlaylists.push(data);
  }

  // Right Content
  const { data: newReleases } = await axios.get(
    `${process.env.API_URL}/browse/new-releases`,
    { headers: headers },
  );
  const { data: listenMoreOften } = await axios.get(
    `${process.env.API_URL}/me/tracks`,
    { headers: headers },
  );
  const { data: favoriteArtists } = await axios.get(
    `${process.env.API_URL}/me/following`,
    {
      headers: headers,
      params: { type: `artist` },
    },
  );

  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-12`}>
      {/* Left Content */}
      <div className={`lg:col-span-8 lg:row-start-1 xl:col-span-9`}>
        <LeftContent
          categories={categories}
          categoriesPlaylists={categoriesPlaylists}
        />
      </div>

      {/* Right Content */}
      <div
        className={`flex bg-base-100 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10`}
      >
        <RightContent
          newReleases={newReleases}
          listenMoreOften={listenMoreOften}
          favoriteArtists={favoriteArtists}
        />
      </div>
    </div>
  );
}
