"use client";

import { useEffect, useState } from "react";

interface SpotifyItem {
  name: string;
  subtitle: string;
  image: string;
  url: string;
}

interface SpotifyArtist {
  name: string;
  images: { url: string }[];
  genres: string[];
  external_urls: { spotify: string };
}

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}

type TimeRange = "short_term" | "medium_term" | "long_term";
type ViewType = "artists" | "tracks";

const timeRangeLabels: Record<TimeRange, string> = {
  short_term: "Last month",
  medium_term: "Last 6 months",
  long_term: "All time",
};

function toItems(viewType: ViewType, items: unknown[]): SpotifyItem[] {
  if (viewType === "artists") {
    return (items as SpotifyArtist[]).map((a) => ({
      name: a.name,
      subtitle: a.genres?.[0] ?? "",
      image: a.images?.[1]?.url || a.images?.[0]?.url || "",
      url: a.external_urls.spotify,
    }));
  }
  return (items as SpotifyTrack[]).map((t) => ({
    name: t.name,
    subtitle: t.artists.map((a) => a.name).join(", "),
    image: t.album.images?.[1]?.url || t.album.images?.[0]?.url || "",
    url: t.external_urls.spotify,
  }));
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-1 rounded border text-sm transition-colors ${
        active ? "border-accent bg-accent-pale text-accent-dark" : "border-line text-ink-muted hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

export default function Vibes() {
  const [timeRange, setTimeRange] = useState<TimeRange>("long_term");
  const [viewType, setViewType] = useState<ViewType>("artists");
  const [items, setItems] = useState<SpotifyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/spotify?time_range=${timeRange}&type=${viewType}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setConfigured(data.configured !== false);
        setItems(toItems(viewType, data.items || []));
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [timeRange, viewType]);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Vibes</h1>
      <p className="meta mt-2">What I&apos;ve been listening to on Spotify.</p>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex gap-2">
          <Toggle active={viewType === "artists"} onClick={() => setViewType("artists")}>
            Top artists
          </Toggle>
          <Toggle active={viewType === "tracks"} onClick={() => setViewType("tracks")}>
            Top tracks
          </Toggle>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
            <Toggle key={range} active={timeRange === range} onClick={() => setTimeRange(range)}>
              {timeRangeLabels[range]}
            </Toggle>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {!configured ? (
          <p className="text-ink-muted">Spotify isn&apos;t connected right now.</p>
        ) : loading ? (
          <p className="text-ink-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink-muted">Couldn&apos;t load Spotify data.</p>
        ) : (
          <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {items.map((item, index) => (
              <li key={`${item.url}-${index}`}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="aspect-square overflow-hidden rounded border border-line bg-paper-dim">
                    {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <p className="mt-2 text-sm font-medium truncate group-hover:text-accent">
                    {index + 1}. {item.name}
                  </p>
                  {item.subtitle && <p className="text-xs text-ink-faint truncate capitalize">{item.subtitle}</p>}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      <p className="mt-8 text-xs text-ink-faint">Data from Spotify.</p>
    </div>
  );
}
