import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCinemas } from '../cinema/CinemaUtils';
import { Cinema } from '../../interfaces/interfaces';

export default function AboutPage() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      const response = await getCinemas();
      setCinemas(response.data);
    };
    fetchCinemas();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold my-4 text-center">Vores Biografer:</h2>
        <hr className="mb-4"/>
      <div className="flex justify-center flex-wrap -mx-4">
        {cinemas.map(cinema => (
          <div key={cinema.id} className="p-4 md:w-1/2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={cinema.imageUrl} alt={cinema.name} className="w-full h-64 object-cover"/>
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{cinema.name}</h3>
                <p className="text-gray-700 mt-2">{cinema.city}, {cinema.street}</p>
                <Link to={`/cinemas/${cinema.id}`} className="inline-block bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-700 transition-colors mt-4">Se detaljer</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}