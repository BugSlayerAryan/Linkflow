import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ScrollToTop from "./components/common/ScrollToTop";

import Home from "./pages/Home";
import FacebookPage from "./pages/FacebookPage";
import InstagramPage from "./pages/InstagramPage";
import YoutubePage from "./pages/YoutubePage";
import TwitterPage from "./pages/TwitterPage";

import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import DMCAPage from "./pages/DMCAPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

import DownloadPreviewPage from "./pages/DownloadPreviewPage";
import DownloadsPage from "./pages/DownloadsPage";
import DownloadPlayerPage from "./pages/DownloadPlayerPage";

import NotFoundPage from "./pages/NotFoundPage";
import ThemeInitializer from "./components/common/ThemeInitializer";
function App() {
  const location = useLocation();

  return (
    <>
      <ThemeInitializer />
      <ScrollToTop />

      <main key={location.pathname} className="page-route-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />

          <Route path="/facebook" element={<FacebookPage />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/x.com" element={<TwitterPage />} />

          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/dmca" element={<DMCAPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />

          
          <Route path="/download" element={<DownloadPreviewPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/downloads/player/:id" element={<DownloadPlayerPage />} />

           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;