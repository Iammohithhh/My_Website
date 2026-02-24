import Vibes from "@/components/Vibes";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function VibesPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navigation />
      <div className="pt-24">
        <Vibes />
      </div>
      <Footer />
    </main>
  );
}
