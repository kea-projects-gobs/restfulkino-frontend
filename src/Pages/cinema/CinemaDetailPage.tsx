import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cinema } from "../../interfaces/interfaces";
import basicCinemaImg from "./testimgs/basiccinema.jpg";
import { getCinemaById } from "./CinemaUtils";

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
        <img
          src={cinema.imageUrl || basicCinemaImg}
          alt={cinema.name}
          className="object-cover w-full h-96 rounded-lg"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold">{cinema.name}</h1>
          <p className="text-xl">
            {cinema.city}, {cinema.street}
          </p>
        </div>
      </div>

      {/* Cinema Description */}
      <div className="p-4 mx-auto">
        <div className="my-8">
          <h2 className="mb-2 text-2xl font-bold">Om biografen</h2>
          <p className="text-gray-600">{cinema.description}</p>
        </div>

        {/* Contact Information */}
        <div className="my-8">
          <h2 className="mb-2 text-2xl font-bold">Kontaktinformation</h2>
          <p className="text-gray-600">
            <strong>Telefon:</strong> {cinema.phone ? cinema.phone : "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {cinema.email ? cinema.email : "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Adresse:</strong> {cinema.city}, {cinema.street}
          </p>
        </div>
      </div>
    </div>
  );
}
