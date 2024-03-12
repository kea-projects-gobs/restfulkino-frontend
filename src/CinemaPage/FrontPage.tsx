import { useNavigate } from 'react-router-dom';
import { Movie } from '../interfaces/interfaces';

export default function TestFrontpage() {
  const navigate = useNavigate();

  const handleMovieSelect = (movie: Movie) => {
    // Redirect to the MovieDetailPage with the selected movie's ID
    navigate(`/movies/${movie.id}`)
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to Restful Kino!</h1>
      <section>
        <h2 className="text-3xl font-semibold mb-4">Now Playing</h2>
        <div className="movies-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Movie card component goes here */}
          <div onClick={() => handleMovieSelect({ id: 1, title: 'Movie 1' })} className="movie-card cursor-pointer bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out">Movie 1</div>
          <div onClick={() => handleMovieSelect({ id: 2, title: 'Movie 2' })} className="movie-card cursor-pointer bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out">Movie 2</div>
        </div>
      </section>
    </div>
  );
}