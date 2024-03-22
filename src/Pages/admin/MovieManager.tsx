import { useEffect, useState } from "react";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../movie/MovieUtils";
import { Link } from "react-router-dom";
import { Movie } from "../../interfaces/interfaces";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";

export function MovieManager() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">(
    "create"
  );

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await getMovies();
    setMovies(response.data);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "edit" && selectedMovie && selectedMovie.id) {
      await updateMovie(selectedMovie.id, selectedMovie);
    } else if (modalType === "create" && selectedMovie) {
      await createMovie(selectedMovie);
    }
    fetchMovies();
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedMovie(
      prev =>
        ({
          ...prev,
          [name]: value,
        } as Movie)
    );
  };

  const openModal = (type: "create" | "edit" | "delete", movie?: Movie) => {
    setModalType(type);
    setSelectedMovie(movie || null);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedMovie && selectedMovie.id) {
      await deleteMovie(selectedMovie.id);
      fetchMovies();
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        Film administration
      </h1>
      <button
        onClick={() => openModal("create")}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tilføj ny film
      </button>

      <ul className="mt-6">
        {movies.map(movie => (
          <li
            key={movie.id}
            className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2"
          >
            <span className="font-medium text-gray-800">
              <Link
                to={`/schedules/movies/${movie.id}`}
                className="hover:underline"
              >
                {movie.title}
              </Link>
            </span>
            <div>
              <button
                onClick={() => openModal("edit", movie)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Rediger
              </button>
              <button
                onClick={() => openModal("delete", movie)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Slet
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${
          modalType.charAt(0).toUpperCase() + modalType.slice(1)
        } Movie`}
      >
        {modalType !== "delete" ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <InputField
              label="Titel"
              name="title"
              value={selectedMovie?.title ?? ""}
              onChange={handleInputChange}
              placeholder="Film titel"
              required
            />
            <InputField
              label="Beskrivelse"
              name="description"
              value={selectedMovie?.description ?? ""}
              onChange={handleInputChange}
              placeholder="Beskrivelse"
              required
            />
            <InputField
              label="Udgivelsesdato"
              name="releaseDate"
              value={selectedMovie?.releaseDate ?? ""}
              onChange={handleInputChange}
              placeholder="Udgivelsesdato"
              required
              type="date"
            />
            <InputField
              label="Længde (i minutter)"
              name="duration"
              value={selectedMovie?.duration ?? ""}
              onChange={handleInputChange}
              placeholder="Længde (i minutter)"
              type="number"
            />
            <InputField
              label="Billede URL"
              name="imageUrl"
              value={selectedMovie?.imageUrl ?? ""}
              onChange={handleInputChange}
              placeholder="Billede URL"
            />
            <InputField
              label="Sprog"
              name="language"
              value={selectedMovie?.language ?? ""}
              onChange={handleInputChange}
              placeholder="Sprog"
            />
            <InputField
              label="Genre"
              name="genre"
              value={selectedMovie?.genre ?? ""}
              onChange={handleInputChange}
              placeholder="Genre"
              required
            />
            <InputField
              label="Instruktør"
              name="director"
              value={selectedMovie?.director ?? ""}
              onChange={handleInputChange}
              placeholder="Instruktør"
            />
            <InputField
              label="Skuespillere"
              name="cast"
              value={selectedMovie?.cast ?? ""}
              onChange={handleInputChange}
              placeholder="Skuespillere"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {modalType === "create" ? "Opret film" : "Gem ændringer"}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-lg mb-4">
              Er du sikker på at du vil slette denne film?
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-gray-800 font-semibold">
                <span className="text-blue-600">{selectedMovie?.title}</span>
              </h2>
            </div>
            <div className="flex justify-end items-center p-4 mt-4 border-t border-gray-200">
              <button
                onClick={handleDelete}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-l"
              >
                Ja, slet
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r ml-2"
              >
                Nej, gå tilbage
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
