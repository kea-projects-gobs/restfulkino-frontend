import "./index.css";
//import Home from "./Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import SchedulePage from "./schedule/SchedulePage";
import TestFrontpage from "./Pages/FrontPage/FrontPage";
import MovieDetailPage from "./Pages/MoviePage/MovieDetailPage";
import CinemaPage from "./Pages/CinemaPage/CinemaPage";
import CinemaDetailPage from "./Pages/CinemaPage/CinemaDetailPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import CreateUserPage from "./Pages/CreateUserPage/CreateUserPage";
import MoviePage from "./Pages/MoviePage/Moviepage";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createuser" element={<CreateUserPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
