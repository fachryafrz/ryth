import { spotify_access_token, spotify_refresh_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { code } = await request.json();

  const cookiesStore = cookies();
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    if (!code) {
      if (cookiesStore.has(spotify_access_token)) {
        return NextResponse.json(
          { access_token: cookiesStore.get(spotify_access_token).value },
          { status: 200 },
        );
      } else {
        const { data } = await axios.post(
          process.env.ACCESS_TOKEN_URL,
          { grant_type: "client_credentials" },
          { headers: headers },
        );

        cookiesStore.set(spotify_access_token, data.access_token, {
          maxAge: data.expires_in,
        });

        return NextResponse.json(data, { status: 200 });
      }
    } else {
      const { data } = await axios.post(
        process.env.ACCESS_TOKEN_URL,
        {
          code: code,
          redirect_uri: process.env.NEXT_PUBLIC_APP_URL,
          grant_type: "authorization_code",
        },
        { headers: headers },
      );

      cookiesStore.set(spotify_access_token, data.access_token, {
        maxAge: data.expires_in,
      });
      cookiesStore.set(spotify_refresh_token, data.refresh_token, {
        maxAge: data.expires_in,
      });

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}
