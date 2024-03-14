// TODO's are outcommented

//import { useNavigate } from 'react-router-dom';
//import { Movie } from '../../interfaces/interfaces';
import basiccinema from "../cinema/testimgs/basiccinema.jpg";
import MoviePage from "../movie/Moviepage";

export default function TestFrontpage() {
  //const navigate = useNavigate();

  //  const handleMovieSelect = (movieId: number) => {
  //    // Redirect to the MovieDetailPage with the selected movie's ID
  //    navigate(`/movies/${movieId}`)
  //  };

  return (
    <div className="container mx-auto">
      <h1 className="my-8 text-4xl font-bold text-center">
        Welcome to Restful Kino!
      </h1>
      <div
        className="bg-center bg-cover rounded-lg shadow-md hero h-96"
        style={{ backgroundImage: `url(${basiccinema})` }}
      ></div>
      <section>
        <h2 className="my-8 text-3xl font-semibold">Now Playing</h2>
        <MoviePage />
      </section>
    </div>
  );
}
