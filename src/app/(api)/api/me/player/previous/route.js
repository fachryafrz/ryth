import {
  spotify_access_token,
  spotify_authorization,
  spotify_refresh_token,
} from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const url = new URL(request.url);
  const { device_id } = Object.fromEntries(url.searchParams);

  const cookiesStore = cookies();

  try {
    if (cookiesStore.has(spotify_access_token)) {
      const { data } = await axios.post(
        `${process.env.API_URL}/me/player/previous`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
          },
          params: { device_id },
        },
      );

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}