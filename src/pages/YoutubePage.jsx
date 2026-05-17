import Navbar from "../components/layout/Navbar";
import YoutubeHerosection from "../components/Youtube/YoutubeHerosection";
import YoutubeFeaturesSection from "../components/Youtube/YoutubeFeaturesSection";
import YoutubeHowItWorks from "../components/Youtube/YoutubeHowItWorks";
import YoutubeFormatsSection from "../components/Youtube/YoutubeFormatsSection";
import YoutubeFAQSection from "../components/Youtube/YoutubeFAQSection";
import YoutubeCTASection from "../components/Youtube/YoutubeCTASection";
import Footer from "../components/layout/Footer";

function YoutubePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <YoutubeHerosection />
      <YoutubeFeaturesSection />
      <YoutubeHowItWorks />
      <YoutubeFormatsSection />
      <YoutubeFAQSection />
      <YoutubeCTASection />
      <Footer />
    </main>
  );
}

export default YoutubePage;