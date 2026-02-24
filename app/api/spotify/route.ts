import { NextResponse } from "next/server";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_TOP_ARTISTS_URL = "https://api.spotify.com/v1/me/top/artists";
const SPOTIFY_TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token || "",
    }),
  });

  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get("time_range") || "long_term";
  const type = searchParams.get("type") || "artists";

  // If no credentials configured, return empty
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json({ items: [], configured: false });
  }

  try {
    const { access_token } = await getAccessToken();

    const url = type === "tracks" ? SPOTIFY_TOP_TRACKS_URL : SPOTIFY_TOP_ARTISTS_URL;

    const response = await fetch(
      `${url}?time_range=${timeRange}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      return NextResponse.json({ items: [], configured: true, error: "Failed to fetch" });
    }

    const data = await response.json();
    return NextResponse.json({ items: data.items, configured: true });
  } catch (error) {
    return NextResponse.json({ items: [], configured: true, error: "Error fetching data" });
  }
}
