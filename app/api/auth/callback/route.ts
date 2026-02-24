import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || "https://mohith-h.vercel.app/api/auth/callback";

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // Display the refresh token so you can copy it to your env vars
    return NextResponse.json({
      message: "Copy the refresh_token below and add it as SPOTIFY_REFRESH_TOKEN in your Vercel environment variables.",
      refresh_token: data.refresh_token,
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to exchange code for token" }, { status: 500 });
  }
}
