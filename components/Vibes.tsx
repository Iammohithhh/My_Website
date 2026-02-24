"use client";

import { motion } from "framer-motion";
import { Music, Disc3, Headphones } from "lucide-react";
import { useState, useEffect } from "react";

interface SpotifyArtist {
  name: string;
  images: { url: string }[];
  genres: string[];
  external_urls: { spotify: string };
}

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: { spotify: string };
}

type TimeRange = "short_term" | "medium_term" | "long_term";
type ViewType = "artists" | "tracks";

const timeRangeLabels: Record<TimeRange, string> = {
  short_term: "Last Month",
  medium_term: "Last 6 Months",
  long_term: "All Time",
};

export default function Vibes() {
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("long_term");
  const [viewType, setViewType] = useState<ViewType>("artists");
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    fetchSpotifyData();
  }, [timeRange, viewType]);

  const fetchSpotifyData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/spotify?time_range=${timeRange}&type=${viewType}`
      );
      const data = await response.json();

      if (!data.configured) {
        setConfigured(false);
        setLoading(false);
        return;
      }

      if (viewType === "artists") {
        setArtists(data.items || []);
      } else {
        setTracks(data.items || []);
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
    setLoading(false);
  };

  return (
    <section id="vibes" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            My <span className="text-gradient">Vibes</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto mb-4" />
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            What I've been listening to on Spotify
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          {/* View Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewType("artists")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewType === "artists"
                  ? "bg-green-500 text-black"
                  : "glass-effect text-gray-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                Top Artists
              </span>
            </button>
            <button
              onClick={() => setViewType("tracks")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewType === "tracks"
                  ? "bg-green-500 text-black"
                  : "glass-effect text-gray-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                Top Tracks
              </span>
            </button>
          </div>

          {/* Time Range Toggle */}
          <div className="flex gap-2">
            {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  timeRange === range
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "glass-effect text-gray-400 hover:text-white"
                }`}
              >
                {timeRangeLabels[range]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {!configured ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect p-12 rounded-xl text-center max-w-2xl mx-auto"
          >
            <Disc3 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="text-xl font-bold text-white mb-2">Spotify Not Connected</h3>
            <p className="text-gray-400 text-sm">
              Set up your Spotify credentials in the .env.local file to display your top artists and tracks.
            </p>
          </motion.div>
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="glass-effect rounded-xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-800 rounded-lg mb-3" />
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : viewType === "artists" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artists.map((artist, index) => (
              <ArtistCard key={artist.name} artist={artist} index={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tracks.map((track, index) => (
              <TrackCard key={`${track.name}-${index}`} track={track} index={index} />
            ))}
          </div>
        )}

        {/* Spotify Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-500"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span>Powered by Spotify</span>
        </motion.div>
      </div>
    </section>
  );
}

function ArtistCard({ artist, index }: { artist: SpotifyArtist; index: number }) {
  const imageUrl = artist.images?.[1]?.url || artist.images?.[0]?.url || "";

  return (
    <motion.a
      href={artist.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-effect rounded-xl p-4 hover:bg-gray-800/40 transition-all duration-300 group"
    >
      {/* Rank Badge */}
      <div className="relative mb-3">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
          {index + 1}
        </div>
      </div>

      {/* Info */}
      <h3 className="font-bold text-white text-sm truncate group-hover:text-green-400 transition-colors">
        {artist.name}
      </h3>
      {artist.genres?.[0] && (
        <p className="text-xs text-gray-500 truncate mt-1 capitalize">
          {artist.genres[0]}
        </p>
      )}
    </motion.a>
  );
}

function TrackCard({ track, index }: { track: SpotifyTrack; index: number }) {
  const imageUrl = track.album.images?.[1]?.url || track.album.images?.[0]?.url || "";

  return (
    <motion.a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-effect rounded-xl p-4 hover:bg-gray-800/40 transition-all duration-300 group"
    >
      {/* Rank Badge */}
      <div className="relative mb-3">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={track.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
          {index + 1}
        </div>
      </div>

      {/* Info */}
      <h3 className="font-bold text-white text-sm truncate group-hover:text-green-400 transition-colors">
        {track.name}
      </h3>
      <p className="text-xs text-gray-500 truncate mt-1">
        {track.artists.map(a => a.name).join(", ")}
      </p>
    </motion.a>
  );
}
