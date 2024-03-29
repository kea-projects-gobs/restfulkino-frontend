import { useEffect, useState } from "react";
import { Movie, Schedule } from "../../interfaces/interfaces";
import { getMovies } from "../../services/api/MovieUtils";
import { useNavigate } from "react-router-dom";
import { getSchedule } from "../../services/api/api";
import MoviePageSkeleton from "./MoviePageSkeleton";

function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    const schedulesResponse = await getSchedule();
    const now = new Date();
    const fiveDaysLater = new Date(now);
    fiveDaysLater.setDate(now.getDate() + 5); // Set the date to 5 days later
    //console.log(fiveDaysLater);

    const upcomingSchedules = schedulesResponse.data.filter(
      (schedule: Schedule) => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate >= now && scheduleDate <= fiveDaysLater;
      }
    );

    // Use movie titles from the upcoming schedules to filter movies
    const upcomingMovieTitles = [
      ...new Set(
        upcomingSchedules.map((schedule: Schedule) => schedule.movieTitle)
      ),
    ];

    const moviesResponse = await getMovies();
    const moviesWithUpcomingSchedules = moviesResponse.data.filter(
      (movie: Movie) => upcomingMovieTitles.includes(movie.title)
    );
    setMovies(moviesWithUpcomingSchedules);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <MoviePageSkeleton />
      ) : (
        <div className="flex flex-wrap justify-center">
          {movies &&
            movies.map(movie => (
              <div
                className="mx-1 my-2 p-4 shadow-md transition duration-500 ease-in-out transform hover:scale-105 bg-gray-100 rounded-md w-80 h-[30rem] flex flex-col hover:cursor-pointer"
                key={movie.id}
                onClick={() => navigate(`/schedules/movies/${movie.id}`)}
              >
                <h1 className="mb-2 text-xl font-semibold text-center ">
                  {movie.title}
                </h1>
                <div className="flex items-center justify-center flex-grow overflow-hidden">
                  {movie.imageUrl && (
                    <img
                      src={movie.imageUrl}
                      alt={`${movie.title} Poster`}
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default MoviePage;
