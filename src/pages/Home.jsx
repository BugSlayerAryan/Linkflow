import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";
import PlatformsSection from "../components/home/PlatformsSection";
import FormatsSection from "../components/home/FormatsSection";
import Testimonials from "../components/home/Testimonials";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <PlatformsSection />
      <FormatsSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}

export default Home;