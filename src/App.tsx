import "./index.css";
import Home from "./Home";
import Layout from "./Layout";
import CinemaPage from "./CinemaPage/CinemaPage";
import AdminCinemaPage from "./CinemaPage/AdminCinemaPage";
import CinemaDetailPage from "./CinemaPage/CinemaDetailPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinemas" element={<CinemaPage />} />
        <Route path="/cinemas/:cinemaId" element={<CinemaDetailPage />} />
        <Route path="/admincinemas" element={<AdminCinemaPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
