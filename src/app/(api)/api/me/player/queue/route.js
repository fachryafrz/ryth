import { spotify_access_token, spotify_authorization } from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = cookies();

  try {
    const { data } = await axios.get(`${process.env.API_URL}/me/player/queue`, {
      headers: {
        Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}
