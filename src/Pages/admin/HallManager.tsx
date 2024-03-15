import React, { useEffect, useState } from "react";
import { getHalls, createHall, updateHall, deleteHall } from "./HallUtils";
import { getCinemas } from "../cinema/CinemaUtils";
import { Hall, Cinema } from "../../interfaces/interfaces";
import Modal from "../../generic-components/Modal";
import InputField from "../../generic-components/InputField";

export function HallManager() {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">("create");

  useEffect(() => {
    fetchHalls();
    fetchCinemas();
  }, []);

  const fetchHalls = async () => {
    const response = await getHalls();
    setHalls(response.data);
  };

  const fetchCinemas = async () => {
    const response = await getCinemas();
    setCinemas(response.data);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "edit" && selectedHall && selectedHall.id) {
      await updateHall(selectedHall.id, selectedHall);
    } else if (modalType === "create" && selectedHall) {
      await createHall(selectedHall);
    }
    fetchHalls();
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedHall((prev) => {
      if (prev === null) {
        // Define a new hall object with default values and the updated field to satisfy TS ....
        const newHall: Hall = {
          name: "",
          noOfRows: 0,
          noOfColumns: 0,
          imageUrl: "",
          cinemaId: 0,
          [name]: value,
        };
        return newHall;
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleCinemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cinemaId = parseInt(e.target.value);
    setSelectedHall((prev) => {
      if (prev === null) {
        // Define a new hall object with default values and the updated cinemaId to satisy TS....
        const newHall: Hall = {
          name: "",
          noOfRows: 0,
          noOfColumns: 0,
          imageUrl: "",
          cinemaId: cinemaId,
        };
        return newHall;
      } else {
        return { ...prev, cinemaId };
      }
    });
  };

  const openModal = (type: "create" | "edit" | "delete", hall?: Hall) => {
    setModalType(type);
    setSelectedHall(hall || null); // Reset selectedHall or set to the passed hall
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedHall && selectedHall.id) {
      await deleteHall(selectedHall.id);
      fetchHalls();
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">Hall Management</h1>
      <button onClick={() => openModal("create")} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Hall
      </button>

      <ul className="mt-6">
        {halls.map((hall) => {
          const cinemaName = cinemas.find((cinema) => cinema.id === hall.cinemaId)?.name || "The hall hasn't been connected to a cinema yet";
          return (
            <li key={hall.id} className="flex flex-wrap justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
              <div>
                <span className="font-medium text-gray-800">{hall.name}</span>
                <span className="text-gray-500"> - {cinemaName}</span>
              </div>
              <div>
                <button
                  onClick={() => openModal("edit", hall)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button onClick={() => openModal("delete", hall)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Hall`}>
        {modalType !== "delete" ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <InputField label="Name" name="name" value={selectedHall?.name ?? ""} onChange={handleInputChange} placeholder="Hall Name" required />
            <InputField label="Rows" name="noOfRows" value={selectedHall?.noOfRows ?? ""} onChange={handleInputChange} placeholder="Number of Rows" />
            <InputField
              label="Columns"
              name="noOfColumns"
              value={selectedHall?.noOfColumns ?? ""}
              onChange={handleInputChange}
              placeholder="Number of Columns"
            />
            <InputField label="Image URL" name="imageUrl" value={selectedHall?.imageUrl ?? ""} onChange={handleInputChange} placeholder="Image URL" />
            <div>
              <label htmlFor="cinemaId" className="block text-sm font-medium text-gray-700">
                Cinema
                <select
                  id="cinemaId"
                  name="cinemaId"
                  value={selectedHall?.cinemaId ?? ""}
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
              </label>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {modalType === "create" ? "Create Hall" : "Save Changes"}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-lg mb-4">Are you sure you want to delete this hall?</p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-gray-800 font-semibold">
                Hall: <span className="text-blue-600">{selectedHall?.name}</span>
              </h2>
              <p className="text-gray-800">
                Cinema:{" "}
                <span className="font-semibold">
                  {cinemas.find((cinema) => cinema.id === selectedHall?.cinemaId)?.name || "The hall hasn't been connected to a cinema yet"}
                </span>
              </p>
            </div>
            <div className="flex justify-end items-center p-4 mt-4 border-t border-gray-200">
              <button onClick={handleDelete} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-l">
                Yes, delete
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r ml-2">
                No, go back
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
