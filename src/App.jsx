// import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// // import Navbar from "./components/layout/Navbar";
// import Home from "./pages/Home";
// import DownloadPreviewPage from "./pages/DownloadPreviewPage";
// import DownloadsPage from "./pages/DownloadsPage";


// function App() {
//   return (
//     <>
//       {/* <Navbar /> */}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/download" element={<DownloadPreviewPage />} />
//         <Route path="/downloads" element={<DownloadsPage />} />
//       </Routes>

//       <ToastContainer
//         position="top-right"
//         autoClose={2600}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//       />
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import DownloadPreviewPage from "./pages/DownloadPreviewPage";
import DownloadsPage from "./pages/DownloadsPage";
import DownloadPlayerPage from "./pages/DownloadPlayerPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<DownloadPreviewPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/downloads/player/:id" element={<DownloadPlayerPage />} />
    </Routes>

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