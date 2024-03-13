import "./index.css";
//import Home from "./Home";
import FrontPage from "./pages/FrontPage/FrontPage";
import Layout from "./Layout";
import CinemaPage from "./pages/CinemaPage/CinemaPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CinemaDetailPage from "./pages/CinemaPage/CinemaDetailPage";
import MovieDetailPage from "./pages/MoviePage/MovieDetailPage.tsx";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage/Moviepage.tsx";
import SchedulePage from "./schedule/SchedulePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/cinemas" element={<CinemaPage />} />
        <Route path="/cinemas/:cinemaId" element={<CinemaDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/MoviePage" element={<MoviePage />} />
        <Route path="/schedule/movie/:id" element={<SchedulePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
