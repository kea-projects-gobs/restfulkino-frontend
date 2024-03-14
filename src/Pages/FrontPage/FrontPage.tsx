// TODO's are outcommented

//import { useNavigate } from 'react-router-dom';
//import { Movie } from '../../interfaces/interfaces';
import basiccinema from "../CinemaPage/testimgs/basiccinema.jpg"
import MoviePage from '../MoviePage/Moviepage';

export default function TestFrontpage() {
  //const navigate = useNavigate();

  //  const handleMovieSelect = (movieId: number) => {
  //    // Redirect to the MovieDetailPage with the selected movie's ID
  //    navigate(`/movies/${movieId}`)
  //  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to Restful Kino!</h1>
      <div className="hero h-96 bg-cover bg-center rounded-lg shadow-md" style={{ backgroundImage: `url(${basiccinema})` }}>
      </div>
      <section>
        <h2 className="text-3xl font-semibold my-8">Now Playing</h2>
          <MoviePage />
      </section>
    </div>
  );
}