import "./index.css";
//import Home from "./Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import SchedulePage from "./Pages/schedule/SchedulePage";
import TestFrontpage from "./Pages/home/FrontPage";
import MovieDetailPage from "./Pages/movie/UpcomingMovies";
import CinemaDetailPage from "./Pages/cinema/CinemaDetailPage";
import AdminPage from "./Pages/admin/AdminPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Logout from "./Pages/LoginPage/Logout";
import CreateUserPage from "./Pages/CreateUserPage/CreateUserPage";
import MoviePage from "./Pages/movie/Moviepage";
import RequireAuth from "./security/RequireAuth";
import BookingPage from "./Pages/booking/BookingPage";
import BookingConfirmation from "./Pages/booking/BookingConfirmation";
import UpcomingMovies from "./Pages/movie/UpcomingMovies";
import AboutPage from "./Pages/about/AboutPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TestFrontpage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/cinemas/:cinemaId" element={<CinemaDetailPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth roles={["ADMIN", "EMPLOYEE"]}>
              <AdminPage />
            </RequireAuth>
          }
        />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/schedules/movies/:id" element={<SchedulePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/createuser" element={<CreateUserPage />} />
        <Route
          path="/schedules/:id/booking"
          element={
            <RequireAuth roles={["USER"]}>
              <BookingPage />
            </RequireAuth>
          }
        />
        {/* <Route path="/schedules/:id/booking" element={<BookingPage />} /> */}
        <Route
          path="/reservation/confirmation"
          element={<BookingConfirmation />}
        />
        <Route path="/comingsoon" element={<UpcomingMovies />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
