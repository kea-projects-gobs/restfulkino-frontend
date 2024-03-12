import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCinemas, createCinema, updateCinema, deleteCinema } from "../CinemaPage/CinemaUtils";
import { Cinema } from "../../interfaces/interfaces";
import Modal from "../../generic-components/Modal";
import InputField from "../../generic-components/InputField";

export default function AdminPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    const response = await getCinemas();
    setCinemas(response.data);
  };

  const openCreateModal = () => {
    setSelectedCinema(null); // To make sure we're creating a new cinema
    setIsCreateModalOpen(true);
  };

  const openEditModal = (cinema: Cinema) => {
    setSelectedCinema(cinema); // To make sure we're editing the correct cinema
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCinema && selectedCinema.id) {
      await updateCinema(selectedCinema.id, selectedCinema);
    } else if (selectedCinema) {
      await createCinema(selectedCinema);
    }
    fetchCinemas();
    closeModals();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setSelectedCinema((prev) => {
      // If the change is for a hall field, handle it differently (future implementation)
      if (name.startsWith('hall')) {
        // Placeholder for future hall handling logic
        // Identify and update hall information
        // This could involve having a more complex state structure or separate handlers for hall fields
        return prev; // For now return prev state
      }
      return {
        ...(prev || {
          id: 0,
          name: "",
          city: "",
          street: "",
          description: "",
          phone: "",
          email: "",
          imageUrl: "",
          // halls: [], // Placeholder for future hall array
        }),
        [name]: value || "", // Fallback for undefined value
      };
    });
  };

  const handleDelete = async () => {
    if (selectedCinema && selectedCinema.id) {
      await deleteCinema(selectedCinema.id);
      fetchCinemas();
      closeModals();
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight text-gray-900">Admin Management</h1>
      <button onClick={openCreateModal} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add new Cinema!
      </button>

      <ul className="mt-6">
        {cinemas.map((cinema) => (
          <li key={cinema.id} className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
            <span className="font-medium text-gray-800">
              <Link to={`/cinemas/${cinema.id}`} className="hover:underline">
                {cinema.name}
              </Link>
            </span>
            <div>
              <button onClick={() => openEditModal(cinema)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2">
                Edit
              </button>
              <button onClick={() => openDeleteModal(cinema)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Create Cinema */}
      <Modal isOpen={isCreateModalOpen} onClose={closeModals} title="Create Cinema">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <InputField name="name" value={selectedCinema?.name ?? ""} onChange={handleInputChange} placeholder="Cinema Name" required />
          <InputField name="city" value={selectedCinema?.city ?? ""} onChange={handleInputChange} placeholder="City" required />
          <InputField name="street" value={selectedCinema?.street ?? ""} onChange={handleInputChange} placeholder="Street" required />
          <InputField name="description" value={selectedCinema?.description ?? ""} onChange={handleInputChange} placeholder="Description" />
          <InputField name="phone" value={selectedCinema?.phone ?? ""} onChange={handleInputChange} placeholder="Phone" />
          <InputField name="email" value={selectedCinema?.email ?? ""} onChange={handleInputChange} placeholder="Email" />
          <InputField name="imageUrl" value={selectedCinema?.imageUrl ?? ""} onChange={handleInputChange} placeholder="Image URL" />
          <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create cinema
          </button>
        </form>
      </Modal>

      {/* Edit cinema */}
      <Modal isOpen={isEditModalOpen} onClose={closeModals} title="Edit Cinema">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <InputField name="name" value={selectedCinema?.name ?? ""} onChange={handleInputChange} placeholder="Cinema Name" required />
          <InputField name="city" value={selectedCinema?.city ?? ""} onChange={handleInputChange} placeholder="City" required />
          <InputField name="street" value={selectedCinema?.street ?? ""} onChange={handleInputChange} placeholder="Street" required />
          <InputField name="description" value={selectedCinema?.description ?? ""} onChange={handleInputChange} placeholder="Description" />
          <InputField name="phone" value={selectedCinema?.phone ?? ""} onChange={handleInputChange} placeholder="Phone" />
          <InputField name="email" value={selectedCinema?.email ?? ""} onChange={handleInputChange} placeholder="Email" />
          <InputField name="imageUrl" value={selectedCinema?.imageUrl ?? ""} onChange={handleInputChange} placeholder="Image URL" />
          <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save changes
          </button>
        </form>
      </Modal>

      {/* Delete cinema */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeModals} title="Delete Cinema">
        <p>Are you sure you want to delete the following?</p>
        <h2>{selectedCinema?.name}</h2>
        <div className="flex justify-end items-center p-4 border-t border-gray-200">
          <button onClick={handleDelete} className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-2">
            Yes, delete
          </button>
          <button onClick={closeModals} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mr-2">
            No, go back
          </button>
        </div>
      </Modal>
    </div>
  );
}
