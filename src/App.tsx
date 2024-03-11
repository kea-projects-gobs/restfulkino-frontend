import "./index.css";
import Home from "./Home";
import Layout from "./Layout";
import CinemaPage from "./CinemaPage/CinemaPage";
import AdminCinemaPage from "./CinemaPage/AdminCinemaPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinemas" element={<CinemaPage />} />
        <Route path="/admincinemas" element={<AdminCinemaPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
