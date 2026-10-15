import type { Metadata } from "next";
import Vibes from "@/components/Vibes";

export const metadata: Metadata = {
  title: "Vibes",
  description: "What Mohith H has been listening to on Spotify.",
};

export default function VibesPage() {
  return <Vibes />;
}
