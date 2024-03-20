import { useEffect, useState } from "react";
import { Movie, Schedule } from "../../interfaces/interfaces";
import { getMovies } from "./MovieUtils";
import { useNavigate } from "react-router-dom";
import { getSchedule } from "../../services/api";

function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const schedulesResponse = await getSchedule();
    const now = new Date();
  
    const currentSchedules = schedulesResponse.data.filter((schedule: Schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate <= now;
    });
  
    // Use movie titles from the schedules to filter movies
    const currentMovieTitles = [...new Set(currentSchedules.map((schedule: Schedule) => schedule.movieTitle))];
  
    const moviesResponse = await getMovies();
    const nowPlayingMovies = moviesResponse.data.filter((movie: Movie) => currentMovieTitles.includes(movie.title));
  
    setMovies(nowPlayingMovies);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {movies  && movies.map((movie) => (
        <div
          className="mx-1 my-2 p-4 shadow-md transition duration-500 ease-in-out transform hover:scale-105 bg-gray-100 rounded-md w-80 h-[30rem] flex flex-col hover:cursor-pointer"
          key={movie.id}
          onClick={() => navigate(`/schedules/movies/${movie.id}`)}
        >
          <h1 className="mb-2 text-xl font-semibold text-center ">{movie.title}</h1>
          <div className="flex items-center justify-center flex-grow overflow-hidden">
            {movie.imageUrl && <img src={movie.imageUrl} alt={`${movie.title} Poster`} className="object-contain w-full h-full" />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoviePage;
