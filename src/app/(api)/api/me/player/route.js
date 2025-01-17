import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_AUTHORIZATION,
  SPOTIFY_REFRESH_TOKEN,
} from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/me/player`,
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
      },
    );

    return NextResponse.json(data, { status });
  } catch ({ response }) {
    const { data, status } = response;

    if (!status) {
      return NextResponse.json(null, {
        status: 200, // Original status was 204 but somehow it keeps returning 500 or 200
      });
    }

    return NextResponse.json(data, { status });
  }
}
