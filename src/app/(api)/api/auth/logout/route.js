import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_REFRESH_TOKEN } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const cookiesStore = cookies();

  try {
    cookiesStore.delete(SPOTIFY_ACCESS_TOKEN);
    cookiesStore.delete(SPOTIFY_REFRESH_TOKEN);

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}
