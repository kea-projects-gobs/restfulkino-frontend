import { useEffect, useState } from "react";
import axios from "axios";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

function MoviePage() {
  const [movies, setMovies] = useState<Movies[]>([]);

  const apiKey = "03e4d52d67ba837b15bf14b047881fd4";
  const popular = "https://api.themoviedb.org/3/movie/popular";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const results = response.data.results;
      setMovies(results);
    });
  };

  return (
    <div className="flex flex-wrap justify-center">
      {movies.map((items) => (
        <div
          className="mx-1 my-2 p-4 shadow-md transition duration-500 ease-in-out transform hover:scale-105"
          key={items.id}
        >
          <h1 className="text-xl font-semibold mb-2 text-center text-gray-300 font-family: dosis">
            {items.title}
          </h1>
          {items.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${items.poster_path}`}
              alt={`${items.title} Poster`}
              className="w-full h-auto"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default MoviePage;
