import "./index.css";
//import Home from "./Home";
import FrontPage from "./Pages/FrontPage/FrontPage";
import Layout from "./Layout";
import CinemaPage from "./Pages/CinemaPage/CinemaPage";
import AdminPage from "./Pages/AdminPage/AdminCinemaPage";
import CinemaDetailPage from "./Pages/CinemaPage/CinemaDetailPage";
import MovieDetailPage from "./Pages/CinemaPage/MovieDetailPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/cinemas" element={<CinemaPage />} />
        <Route path="/cinemas/:cinemaId" element={<CinemaDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
