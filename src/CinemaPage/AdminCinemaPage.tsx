import { useEffect, useState } from "react";
import { getCinemas, createCinema, updateCinema, deleteCinema } from "./CinemaUtils";
import { Cinema } from "../interfaces/interfaces";
import Modal from "./Modal";

export default function AdminCinemaPage() {
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
    setSelectedCinema((prev) => ({
      ...(prev
        ? prev
        : {
            id: 0,
            name: "",
            city: "",
            street: "",
            description: "",
            phone: "",
            email: "",
            imageUrl: "",
          }),
      [e.target.name]: e.target.value || "", // Fallback for undefined value
    }));
  };

  const handleDelete = async () => {
    if (selectedCinema && selectedCinema.id) {
      await deleteCinema(selectedCinema.id);
      fetchCinemas();
      closeModals();
    }
  };

  return (
    <div>
      <h1>Admin Cinema Management</h1>
      <button onClick={openCreateModal}>Add new Cinema!</button>

      <ul>
        {cinemas.map((cinema) => (
          <li key={cinema.id}>
            {cinema.name} -<button onClick={() => openEditModal(cinema)}>Edit</button>
            <button onClick={() => openDeleteModal(cinema)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Create Cinema */}
      <Modal isOpen={isCreateModalOpen} onClose={closeModals}>
        <h2>Create new Cinema</h2>
        <form onSubmit={handleFormSubmit}>
          <input name="name" value={selectedCinema?.name ?? ""} onChange={handleInputChange} placeholder="Cinema Name" required />
          <input name="city" value={selectedCinema?.city ?? ""} onChange={handleInputChange} placeholder="City" required />
          <input name="street" value={selectedCinema?.street ?? ""} onChange={handleInputChange} placeholder="Street" required />
          <input name="description" value={selectedCinema?.description ?? ""} onChange={handleInputChange} placeholder="Description" />
          <input name="phone" value={selectedCinema?.phone ?? ""} onChange={handleInputChange} placeholder="Phone" />
          <input name="email" value={selectedCinema?.email ?? ""} onChange={handleInputChange} placeholder="Email" />
          <input name="imageUrl" value={selectedCinema?.imageUrl ?? ""} onChange={handleInputChange} placeholder="Image URL" />
          <button type="submit">Create cinema!</button>
        </form>
      </Modal>

      {/* Edit cinema */}
      <Modal isOpen={isEditModalOpen} onClose={closeModals}>
        <h2>Edit Cinema</h2>
      <form onSubmit={handleFormSubmit}>
        <input name="name" value={selectedCinema?.name ?? ""} onChange={handleInputChange} placeholder="Cinema Name" required />
        <input name="city" value={selectedCinema?.city ?? ""} onChange={handleInputChange} placeholder="City" required />
        <input name="street" value={selectedCinema?.street ?? ""} onChange={handleInputChange} placeholder="Street" required />
        <input name="description" value={selectedCinema?.description ?? ""} onChange={handleInputChange} placeholder="Description" />
        <input name="phone" value={selectedCinema?.phone ?? ""} onChange={handleInputChange} placeholder="Phone" />
        <input name="email" value={selectedCinema?.email ?? ""} onChange={handleInputChange} placeholder="Email" />
        <input name="imageUrl" value={selectedCinema?.imageUrl ?? ""} onChange={handleInputChange} placeholder="Image URL" />
        <button type="submit">Save Cinema</button>
      </form>
      </Modal>

      {/* Delete cinema */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeModals}>
        <p>Are you sure you want to delete the following?</p>
        <h2>{selectedCinema?.name}</h2>
        <button onClick={handleDelete}>Yes, delete</button>
        <button onClick={closeModals}>No, go back</button>
      </Modal>
    </div>
  );
}
