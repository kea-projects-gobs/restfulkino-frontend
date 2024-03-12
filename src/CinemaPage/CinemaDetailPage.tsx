import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCinemaById } from "./CinemaUtils";
import { Cinema } from "../interfaces/interfaces";
import basicCinemaImg from "./testimgs/basiccinema.jpg";

export default function CinemaDetailPage() {
  const { cinemaId } = useParams();
  const [cinema, setCinema] = useState<Cinema | null>(null);

  useEffect(() => {
    const fetchCinema = async () => {
      const response = await getCinemaById(Number(cinemaId));
      setCinema(response.data);
    };
    fetchCinema();
  }, [cinemaId]);

  if (!cinema) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Image */}
      <div className="relative">
        <img src={cinema.imageUrl || basicCinemaImg} alt={cinema.name} className="w-full h-96 object-cover" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4 text-white w-full">
          <h1 className="text-4xl font-bold">{cinema.name}</h1>
          <p className="text-xl">
            {cinema.city}, {cinema.street}
          </p>
        </div>
      </div>

      {/* Cinema Description */}
      <div className="mx-auto p-4">
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-2">About the Cinema</h2>
          <p className="text-gray-600">{cinema.description}</p>
        </div>

        {/* Afventer halls, spilletider etc. */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Additional information</h2>
          <p className="text-gray-600">Film, spilletider, sale etc...</p>
        </div>

        {/* Contact Information */}
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
          <p className="text-gray-600">
            <strong>Phone:</strong> {cinema.phone ? cinema.phone : "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {cinema.email ? cinema.email : "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Address:</strong> {cinema.city}, {cinema.street}
          </p>
        </div>
      </div>
    </div>
  );
}
