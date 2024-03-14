import "./index.css";
//import Home from "./Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import SchedulePage from "./schedule/SchedulePage";
import TestFrontpage from "./pages/frontpage/FrontPage";
import MovieDetailPage from "./pages/moviepage/MovieDetailPage";
import CinemaPage from "./pages/cinemapage/CinemaPage";
import CinemaDetailPage from "./pages/cinemapage/CinemaDetailPage";
import AdminPage from "./pages/adminpage/AdminPage";
import MoviePage from "./pages/moviepage/Moviepage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TestFrontpage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/cinemas" element={<CinemaPage />} />
        <Route path="/cinemas/:cinemaId" element={<CinemaDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/schedules/movies/:id" element={<SchedulePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
