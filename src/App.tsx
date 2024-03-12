import "./index.css";
import Home from "./Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/Moviepage.tsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MoviePage" element={<MoviePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
