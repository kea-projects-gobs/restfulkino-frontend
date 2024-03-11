import { useEffect, useState } from 'react'
import { getCinemas } from './CinemaUtils';
import { Cinema } from '../interfaces/interfaces';
import basicCinemaImg from './testimgs/basiccinema.jpg'


export default function CinemaPage(){
    const [cinemas, setCinemas] = useState<Cinema[]>([]);

    useEffect(() => {
        fetchCinemas()
    }, [])

    const fetchCinemas = async () => {
        const response = await getCinemas()
        setCinemas(response.data)
    }

    return (
        <div className="flex flex-wrap -mx-4">
            {cinemas.map((cinema) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4 flex" key={cinema.id}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col w-full">
                        <img src={cinema.imageUrl || basicCinemaImg} alt={cinema.name} className="w-full h-48 object-cover"/>
                        <div className="p-4 flex flex-grow">
                            <div className="flex flex-col justify-between flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{cinema.name}</h2>
                                <p className="text-gray-700">{cinema.city}, {cinema.street}</p>
                                <p className="text-gray-600 text-sm mb-4">{cinema.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

