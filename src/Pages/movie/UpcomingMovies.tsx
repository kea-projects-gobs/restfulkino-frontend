import { useEffect, useState } from "react";
import { Movie } from "../../interfaces/interfaces";
import { getMovies } from "../../services/api/MovieUtils";
import { useNavigate } from "react-router-dom";

function UpcomingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await getMovies();
    const now = new Date();
    const UpcomingMovies = response.data.filter((movie: Movie) => {
      return new Date(movie.releaseDate) > now;
    });
    setMovies(UpcomingMovies);
  };

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '. ').toUpperCase();
  }

  return (
    <div className="flex flex-wrap justify-center">
      {movies.map((movie) => (
        <div
          className="mx-1 my-2 p-4 shadow-md transition duration-500 ease-in-out transform hover:scale-105 bg-gray-100 rounded-md w-80 h-[30rem] flex flex-col hover:cursor-pointer"
          key={movie.id}
          onClick={() => navigate(`/schedules/movies/${movie.id}`)}
        >
          <h1 className="mb-2 text-xl font-semibold text-center ">{movie.title}</h1>
          <div className="flex items-center justify-center flex-grow overflow-hidden">
            {movie.imageUrl && <img src={movie.imageUrl} alt={`${movie.title} Poster`} className="object-contain w-full h-full" />}
          </div>
          <p className="mt-2 font-semibold text-center">{formatDate(movie.releaseDate)}</p>
        </div>
      ))}
    </div>
  );
}

export default UpcomingMovies;
