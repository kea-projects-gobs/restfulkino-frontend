import { useEffect, useState } from 'react'
import { getCinemas } from './CinemaUtils';
import { Cinema } from '../interfaces/interfaces';


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
        <div>
            <h1>Cinemas</h1>
            <ul>
                {cinemas.map((cinema) => (
                    <li key={cinema.id}>
                        <h2>{cinema.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )
}

