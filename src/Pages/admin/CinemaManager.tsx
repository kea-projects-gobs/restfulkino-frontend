import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCinemas,
  createCinema,
  updateCinema,
  deleteCinema,
} from "../cinema/CinemaUtils";
import { Cinema } from "../../interfaces/interfaces";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";

export function CinemaManager() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">(
    "create"
  );

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    const response = await getCinemas();
    setCinemas(response.data);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "edit" && selectedCinema && selectedCinema.id) {
      await updateCinema(selectedCinema.id, selectedCinema);
    } else if (modalType === "create" && selectedCinema) {
      await createCinema(selectedCinema);
    }
    fetchCinemas();
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedCinema(prev => {
      if (prev === null) {
        // if null, create new cinema object with default values and the updated field to satisfy TS...
        const newCinema: Cinema = {
          name: "",
          city: "",
          street: "",
          description: "",
          phone: "",
          email: "",
          imageUrl: "",
          [name]: value,
        };
        return newCinema;
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const openModal = (type: "create" | "edit" | "delete", cinema?: Cinema) => {
    setModalType(type);
    setSelectedCinema(cinema || null);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedCinema && selectedCinema.id) {
      await deleteCinema(selectedCinema.id);
      fetchCinemas();
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        Biograf administration
      </h1>
      <button
        onClick={() => openModal("create")}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tilføj ny biograf
      </button>

      <ul className="mt-6">
        {cinemas.map(cinema => (
          <li
            key={cinema.id}
            className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2"
          >
            <span className="font-medium text-gray-800">
              <Link to={`/cinemas/${cinema.id}`} className="hover:underline">
                {cinema.name}
              </Link>
            </span>
            <div>
              <button
                onClick={() => openModal("edit", cinema)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Rediger
              </button>
              <button
                onClick={() => openModal("delete", cinema)}
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
        } Cinema`}
      >
        {modalType !== "delete" ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <InputField
              label="Navn"
              name="name"
              value={selectedCinema?.name ?? ""}
              onChange={handleInputChange}
              placeholder="Biograf navn"
              required
            />
            <InputField
              label="By"
              name="city"
              value={selectedCinema?.city ?? ""}
              onChange={handleInputChange}
              placeholder="By"
              required
            />
            <InputField
              label="Gade"
              name="street"
              value={selectedCinema?.street ?? ""}
              onChange={handleInputChange}
              placeholder="Gade"
              required
            />
            <InputField
              label="Beskrivelse"
              name="description"
              value={selectedCinema?.description ?? ""}
              onChange={handleInputChange}
              placeholder="Beskrivelse"
            />
            <InputField
              label="Telefon"
              name="phone"
              value={selectedCinema?.phone ?? ""}
              onChange={handleInputChange}
              placeholder="Telefon nummer"
            />
            <InputField
              label="Email"
              name="email"
              value={selectedCinema?.email ?? ""}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <InputField
              label="Billede URL"
              name="imageUrl"
              value={selectedCinema?.imageUrl ?? ""}
              onChange={handleInputChange}
              placeholder="Billede URL"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {modalType === "create" ? "Opret biograf" : "Gem ændringer"}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-lg mb-4">
              Er du sikker på at du vil slette denne biograf?
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-gray-800 font-semibold">
                <span className="text-blue-600">{selectedCinema?.name}</span>
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
