import { useEffect, useState } from "react";
import { getSchedule, createSchedule, updateSchedule, deleteSchedule } from "../../services/api";
import { getHallsByCinemaId } from "./HallUtils";
import { getMovies } from "../moviepage/MovieUtils";
import { getCinemas } from "../cinemapage/CinemaUtils";
import Modal from "../../generic-components/Modal";
import InputField from "../../generic-components/InputField";
import { ScheduleType } from "../../types";
import { Movie, Cinema, Hall } from "../../interfaces/interfaces";

export function ScheduleManager() {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedCinemaId, setSelectedCinemaId] = useState<number | null>(null);
  const [selectedHallId, setSelectedHallId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">("create");

  useEffect(() => {
    fetchSchedules();
    fetchMovies();
    fetchCinemas();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await getSchedule();
      setSchedule(response.data);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  const fetchCinemas = async () => {
    try {
      const response = await getCinemas();
      setCinemas(response.data);
    } catch (error) {
      console.log("Failed to fetch cinemas:", error);
    }
  };

  const fetchHalls = async (cinemaId: number) => {
    const halls = await getHallsByCinemaId(cinemaId);
    setHalls(halls.data);
  };

  const openModal = async (type: "create" | "edit" | "delete", schedule?: ScheduleType) => {
    setModalType(type);
    setIsModalOpen(true);

    if (type === "edit" && schedule) {
      setSelectedSchedule(schedule);
      // Find and set the movie ID
      const movieId = movies.find((movie) => movie.title === schedule.movieTitle)?.id;
      setSelectedMovieId(movieId);
      // Find and set the cinema ID
      const cinemaId = cinemas.find((cinema) => cinema.name === schedule.cinemaName)?.id;
      setSelectedCinemaId(cinemaId);
      if (cinemaId) {
        // Fetch halls for the selected cinema
        await fetchHalls(cinemaId);
        // Then, find and set the hall ID
        const hallId = halls.find((hall) => hall.name === schedule.hallName)?.id;
        setSelectedHallId(hallId);
      }
    } else if (type === "create") {
      // Reset or initialize values for creating a new schedule
      setSelectedMovieId(null);
      setSelectedCinemaId(null);
      setSelectedHallId(null);
      setSelectedSchedule({
        movieTitle: "",
        cinemaName: "",
        hallName: "",
        date: "",
        startTime: "",
        is3d: false,
      });
    }
  };

  const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const movieId = parseInt(e.target.value);
    setSelectedMovieId(movieId);

    // Find the selected movie by ID
    const selectedMovie = movies.find((movie) => movie.id === movieId);
    if (selectedMovie) {
      // Update the selectedSchedule with the movie's name
      setSelectedSchedule((prev) => ({
        ...prev,
        movieTitle: selectedMovie.title,
      }));
    }
  };

  const handleCinemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cinemaId = parseInt(e.target.value, 10);
    setSelectedCinemaId(cinemaId);
    // Find the selected cinema by ID
    const selectedCinema = cinemas.find((cinema) => cinema.id === cinemaId);
    if (selectedCinema) {
      // Update the selectedSchedule with the cinema's name
      setSelectedSchedule((prevSchedule) => ({
        ...prevSchedule,
        cinemaName: selectedCinema.name,
      }));
    }
    // Fetch halls based on selected cinema
    fetchHalls(cinemaId);
  };

  const handleHallChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hallId = parseInt(e.target.value, 10);
    setSelectedHallId(hallId);
    // Find the selected hall by ID
    const selectedHall = halls.find((hall) => hall.id === hallId);
    if (selectedHall) {
      // Update the selectedSchedule with the hall's name
      setSelectedSchedule((prevSchedule) => ({
        ...prevSchedule,
        hallName: selectedHall.name,
      }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the necessary information is present to make TS happy
    if (!selectedSchedule || !selectedSchedule.movieTitle || !selectedSchedule.cinemaName || !selectedSchedule.hallName) {
      return;
    }

    try {
      // Determine whether to create or update the schedule based on modalType
      if (modalType === "edit" && selectedSchedule.id) {
        // Call the update API function directly with selectedSchedule
        await updateSchedule(selectedSchedule.id, selectedSchedule);
      } else if (modalType === "create") {
        // Call the create API function directly with selectedSchedule
        await createSchedule(selectedSchedule);
      }
      // After successful operation, fetch schedules again to refresh the list and close the modal
      fetchSchedules();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit schedule:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setSelectedSchedule(
      (prev) =>
        ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        } as ScheduleType)
    );
  };

  const handleDelete = async () => {
    if (selectedSchedule && selectedSchedule.id) {
      await deleteSchedule(selectedSchedule.id);
      fetchSchedules();
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">Schedule Management</h1>
      <button onClick={() => openModal("create")} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Schedule
      </button>

      <ul className="mt-6">
        {schedule.map((schedule) => (
          <li key={schedule.id} className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
            <span className="font-medium text-gray-800">
              {schedule.cinemaName} playing {schedule.movieTitle} in {schedule.hallName} on {schedule.date} at {schedule.startTime}
            </span>
            <div>
              <button
                onClick={() => openModal("edit", schedule)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Edit
              </button>
              <button onClick={() => openModal("delete", schedule)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Schedule`}>
        {modalType !== "delete" ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Movie
                <select
                  id="movie"
                  value={selectedMovieId ?? ""}
                  onChange={handleMovieChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a Movie</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cinema</label>
              <select
                value={selectedCinemaId ?? ""}
                onChange={handleCinemaChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a Cinema</option>
                {cinemas.map((cinema) => (
                  <option key={cinema.id} value={cinema.id}>
                    {cinema.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Hall</label>
              <select
                value={selectedHallId ?? ""}
                onChange={handleHallChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a Hall</option>
                {halls.map((hall) => (
                  <option key={hall.id} value={hall.id}>
                    {hall.name}
                  </option>
                ))}
              </select>
            </div>
            <InputField label="Date" name="date" value={selectedSchedule?.date ?? ""} onChange={handleInputChange} required type="date" />
            <InputField
              label="Start Time"
              name="startTime"
              value={selectedSchedule?.startTime ?? ""}
              onChange={handleInputChange}
              required
              type="time"
            />
            <div className="flex items-center">
              <input type="checkbox" id="is3d" name="is3d" checked={selectedSchedule?.is3d || false} onChange={handleInputChange} />
              <label htmlFor="is3d" className="ml-2">
                Is 3D
              </label>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {modalType === "create" ? "Create Schedule" : "Save Changes"}
            </button>
          </form>
        ) : (
          <div>
            <p>Are you sure you want to delete the following schedule?</p>
            <h2>
              {selectedSchedule?.cinemaName ?? "Unknown Cinema"} playing {selectedSchedule?.movieTitle ?? "Unknown Movie"} in{" "}
              {selectedSchedule?.hallName ?? "Unknown Hall"} on {selectedSchedule?.date ?? "Unknown Date"} from{" "}
              {selectedSchedule?.startTime ?? "Unknown Start Time"} to {selectedSchedule?.endTime ?? "Unknown End Time"}
            </h2>
            <div className="flex justify-end items-center p-4 border-t border-gray-200">
              <button onClick={handleDelete} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-2">
                Yes, delete
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mr-2">
                No, go back
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
