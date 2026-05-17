import Navbar from "../components/layout/Navbar";
import InstagramHeroSection from "../components/Instagram/InstagramHeroSection";
import InstagramFeaturesSection from "../components/Instagram/InstagramFeaturesSection";
import InstagramHowItWorks from "../components/Instagram/InstagramHowItWorks";
import InstagramFormatsSection from "../components/Instagram/InstagramFormatsSection";
import InstagramFAQSection from "../components/Instagram/InstagramFAQSection";
import InstagramCTASection from "../components/Instagram/InstagramCTASection";
import Footer from "../components/layout/Footer";

function InstagramPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <InstagramHeroSection />
      <InstagramFeaturesSection />
      <InstagramHowItWorks />
      <InstagramFormatsSection />
      <InstagramFAQSection />
      <InstagramCTASection />
      <Footer />
    </main>
  );
}

export default InstagramPage;