import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCinemas } from "../CinemaPage/CinemaUtils"; // Assuming getCinemas fetches all cinemas
import { Cinema } from "../../interfaces/interfaces";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  useEffect(() => {
    const fetchCinemas = async () => {
      const response = await getCinemas();
      setCinemas(response.data);
      // Future implementation: Filter cinemas to only those showing the selected movie
      // using the getCinemasForMovie
    };

    fetchCinemas();
  }, []);

  // Placeholder since we don't use movieId yet outcomment this when we do
  console.log(movieId);

  const handleCinemaSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cinemaId = event.target.value;
    const selected = cinemas.find((cinema) => cinema.id?.toString() === cinemaId);
    setSelectedCinema(selected || null);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <h2 className="text-2xl font-bold">Selected Movie Details</h2>
        <p className="text-lg text-gray-600 mt-2">Details of the movie will be shown here...</p>
      </div>
      <div className="mb-8">
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
