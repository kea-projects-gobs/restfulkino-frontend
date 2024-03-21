// TODO's are outcommented

//import { useNavigate } from 'react-router-dom';
//import { Movie } from '../../interfaces/interfaces';
import MoviePage from "../movie/Moviepage";
import Carousel from "../home/Carousel";




export default function TestFrontpage() {
  //const navigate = useNavigate();

  //  const handleMovieSelect = (movieId: number) => {
  //    // Redirect to the MovieDetailPage with the selected movie's ID
  //    navigate(`/movies/${movieId}`)
  //  };

  return (
    <div className="relative">
      <h1 className="text-4xl font-bold text-center my-8">
        Velkommen til Restful Kino!
      </h1>
      <div>
        <Carousel/>
      </div>
      <section>
        <h2 className="text-3xl font-semibold my-8">Spiller nu</h2>
        <MoviePage />
      </section>
    </div>
  );
}
