import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCinemas } from "../cinemapage/CinemaUtils";
import { Cinema, Movie } from "../../interfaces/interfaces";
import { getMovieById } from "./MovieUtils";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  useEffect(() => {
    const fetchMoviesAndCinemas = async () => {
      const cinemaResponse = await getCinemas();
      setCinemas(cinemaResponse.data);
      if (movieId !== undefined){
        const movieResponse = await getMovieById(parseInt(movieId));
        setMovie(movieResponse.data);
      }
      // Future implementation: Filter cinemas to only those showing the selected movie
      // using the (not yet implemented in backend) getCinemasForMovie function
    };

    fetchMoviesAndCinemas();
  }, [movieId]);


  const handleCinemaSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cinemaId = event.target.value;
    const selected = cinemas.find((cinema) => cinema.id?.toString() === cinemaId);
    setSelectedCinema(selected || null);
  };

  return (
    <div>
      {movie && (
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="flex-initial w-full md:w-auto">
          <img src={movie.imageUrl} alt={movie.title} className="p-4 shadow-md bg-slate-900 rounded-md w-80 h-[30rem] object-cover" />
          </div>
          <div className="flex-1 md:ml-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-xs md:text-sm text-gray-500">Release Date: {movie.releaseDate}</p>
            <p className="text-xs md:text-sm text-gray-500">Duration: {movie.duration} minutes</p>
            <div className="mt-4">
              <h2 className="text-xl md:text-2xl font-semibold">Genres</h2>
              <p className="text-md md:text-lg text-gray-600">{movie.genre}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl md:text-2xl font-semibold">Description</h2>
              <p className="text-md md:text-lg text-gray-600">{movie.description}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl md:text-2xl font-semibold">Cast & Crew</h2>
              <p className="text-md md:text-lg text-gray-600">Director: {movie.director}</p>
              <p className="text-md md:text-lg text-gray-600">Stars: {movie.cast}</p>
            </div>
          </div>
        </div>
      )}
      <div className="my-8">
        <select className="form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" value={selectedCinema ? selectedCinema.id : ""} onChange={handleCinemaSelect} aria-label="Select a cinema">
          <option value="">Select a cinema</option>
          {cinemas.map((cinema) => (
            <option key={cinema.id} value={cinema.id}>
              {cinema.name}
            </option>
          ))}
        </select>
      </div>
      {/* Placeholder for Schedule Component */}
      {/* The Schedule Component will display the movie schedules for the selected cinema */}
      {/* This could involve fetching schedule data based on the selectedCinema.id and movieId */}
      {selectedCinema && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Schedule for {selectedCinema.name}</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Schedule Component goes here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
