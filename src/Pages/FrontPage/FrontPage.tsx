// TODO's are outcommented

//import { useNavigate } from 'react-router-dom';
//import { Movie } from '../../interfaces/interfaces';
import basiccinema from "../CinemaPage/testimgs/basiccinema.jpg"

export default function TestFrontpage() {
 // const navigate = useNavigate();

  // const handleMovieSelect = (movie: Movie) => {
  //   // Redirect to the MovieDetailPage with the selected movie's ID
  //   navigate(`/movies/${movie.id}`)
  // };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to Restful Kino!</h1>
      <div className="hero h-96 bg-cover bg-center rounded-lg shadow-md" style={{ backgroundImage: `url(${basiccinema})` }}>
        {/* Image is now set as a background, so no <img> tag is needed */}
      </div>
      <section>
        <h2 className="text-3xl font-semibold my-8">Now Playing</h2>
        <div className="movies-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Movie card component goes here */}
        </div>
      </section>
    </div>
  );
}