import { useEffect, useState } from "react";
import { Movie } from "../../interfaces/interfaces";
import { getMovies } from "./MovieUtils";

function MoviePage({ onMovieSelect }: { onMovieSelect?: (movieId: number) => void }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await getMovies();
    setMovies(response.data);
  }

  return (
    <div className="flex flex-wrap justify-center">
      {movies.map((movie) => (
        <div onClick={() => movie.id !== undefined && onMovieSelect && onMovieSelect(movie.id)}
          className="mx-1 my-2 p-4 shadow-md transition duration-500 ease-in-out transform hover:scale-105 bg-slate-900 rounded-md w-80 h-[30rem] flex flex-col"
          key={movie.id}
        >
          <h1 className="text-xl font-semibold mb-2 text-center text-gray-300">
            {movie.title}
          </h1>
          <div className="flex-grow flex items-center justify-center overflow-hidden"> 
            {movie.imageUrl && (
              <img
                src={movie.imageUrl}
                alt={`${movie.title} Poster`}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoviePage;
