import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { limiter, tokenExpired } from "../config/limiter";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { url, options, access_token } = Object.fromEntries(searchParams);

  const parsedOptions = options ? JSON.parse(options) : {};

  const cookiesStore = cookies();
  let client_access_token = cookiesStore.get(SPOTIFY_ACCESS_TOKEN)?.value;

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(request);

  console.log(remainingToken)

  if (!access_token && !client_access_token) {
    const { data } = await axios.post(
      process.env.ACCESS_TOKEN_URL,
      { grant_type: "client_credentials" },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    client_access_token = data.access_token;
  }

  try {
    const { data, status } = await axios.request({
      method: "GET",
      baseURL: process.env.API_URL,
      url,
      headers: {
        Authorization: `Bearer ${access_token || client_access_token}`,
      },
      ...parsedOptions,
    });

    return NextResponse.json(data, { status });
  } catch ({ response }) {
    const { data, status } = response;

    return NextResponse.json(data, { status });
  }
}
