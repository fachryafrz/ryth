import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookiesStore = cookies();

  try {
    if (cookiesStore.has(spotify_access_token)) {
      const { data } = await axios.get(
        `${process.env.API_URL}/browse/categories`,
        {
          headers: {
            Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
          },
        },
      );

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}