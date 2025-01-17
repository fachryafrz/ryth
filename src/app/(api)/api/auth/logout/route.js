import {
  RYTH_REDIRECT,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    cookiesStore.delete(SPOTIFY_ACCESS_TOKEN);
    cookiesStore.delete(SPOTIFY_REFRESH_TOKEN);

    const params = new URLSearchParams({
      grant_type: "client_credentials",
    });
    const data = await fetch(process.env.ACCESS_TOKEN_URL, {
      method: "POST",
      headers: headers,
      body: params.toString(),
    }).then((res) => res.json());

    cookiesStore.set(SPOTIFY_ACCESS_TOKEN, data.access_token, {
      maxAge: data.expires_in,
    });
    cookiesStore.delete(RYTH_REDIRECT);

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}
