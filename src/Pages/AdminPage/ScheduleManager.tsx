import { useEffect, useState } from "react";
import { getSchedule, createSchedule, updateSchedule, deleteSchedule } from "../../services/api";
import Modal from "../../generic-components/Modal";
import InputField from "../../generic-components/InputField";
import { ScheduleType } from "../../types";

export function ScheduleManager() {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete">("create");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const schedules = await getSchedule();
    setSchedule(schedules.data);
  };

  const openModal = (type: "create" | "edit" | "delete", schedule?: ScheduleType) => {
    setModalType(type);
    setSelectedSchedule(schedule || null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "edit" && selectedSchedule) {
      await updateSchedule(selectedSchedule.id, selectedSchedule);
    } else if (modalType === "create" && selectedSchedule) {
      await createSchedule(selectedSchedule);
    }
    fetchSchedules();
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setSelectedSchedule(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    } as ScheduleType));
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
            <InputField label="Movie Title" name="movieTitle" value={selectedSchedule?.movieTitle ?? ""} onChange={handleInputChange} placeholder="Movie Title" required />
            <InputField label="Hall Name" name="hallName" value={selectedSchedule?.hallName ?? ""} onChange={handleInputChange} placeholder="Hall name" required />
            <InputField label="Cinema Name" name="cinemaName" value={selectedSchedule?.cinemaName ?? ""} onChange={handleInputChange} placeholder="Cinema name" required />
            <InputField label="Date" name="date" value={selectedSchedule?.date ?? ""} onChange={handleInputChange} required type="date"/>
            <InputField label="Start Time" name="startTime" value={selectedSchedule?.startTime ?? ""} onChange={handleInputChange} required type="time"/>
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
              {selectedSchedule?.hallName ?? "Unknown Hall"} on{" "}
              {selectedSchedule?.date  ?? "Unknown Date"} from{" "}
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
