import Navbar from "../components/layout/Navbar";
import XHeroSection from "../components/Twitter/XHeroSection";
import XFeaturesSection from "../components/Twitter/XFeaturesSection";
import XHowItWorks from "../components/Twitter/XHowItWorks";
import XFormatsSection from "../components/Twitter/XFormatsSection";
import XFAQSection from "../components/Twitter/XFAQSection";
import XCTASection from "../components/Twitter/XCTASection";
import Footer from "../components/layout/Footer";

function TwitterPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <XHeroSection />
      <XFeaturesSection />
      <XHowItWorks />
      <XFormatsSection />
      <XFAQSection />
      <XCTASection />
      <Footer />
    </main>
  );
}

export default TwitterPage;