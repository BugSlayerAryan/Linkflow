import Navbar from "../components/layout/Navbar";
import FacebookHerosection from "../components/Facebook/FacebookHeroSection";
import FacebookFeaturesSection from "../components/Facebook/FacebookFeaturesSection";
import FacebookHowItWorks from "../components/Facebook/FacebookHowItWorks";
import FacebookFormatsSection from "../components/Facebook/FacebookFormatsSection";
import FacebookFAQSection from "../components/Facebook/FacebookFAQSection";
import FacebookCTASection from "../components/Facebook/FacebookCTASection";
import Footer from "../components/layout/Footer";

function FacebookPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <FacebookHerosection />
      <FacebookFeaturesSection />
      <FacebookHowItWorks />
      <FacebookFormatsSection />
      <FacebookFAQSection />
      <FacebookCTASection />
      <Footer />
    </main>
  );
}

export default FacebookPage;