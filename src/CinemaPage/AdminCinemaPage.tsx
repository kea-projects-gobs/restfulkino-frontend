import { useEffect, useState } from 'react'
import { getCinemas, createCinema, updateCinema, deleteCinema } from './CinemaUtils'
import { Cinema } from '../interfaces/interfaces';

export default function AdminCinemaPage(){
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
    //const [newCinema, setNewCinema] = useState<Cinema | null>(null);

    useEffect(() => {
        fetchCinemas();
    }, [])

    const fetchCinemas = async () => {
        const response = await getCinemas();
        setCinemas(response.data);
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCinema && selectedCinema.id) {
            await updateCinema(selectedCinema.id, selectedCinema);
        } else if (selectedCinema) {
            await createCinema(selectedCinema);
        }
        fetchCinemas();
        setSelectedCinema(null); // Reset selectedCinema to null
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCinema(prev => ({
            ...prev ? prev : {
                id: 0, 
                name: '',
                city: '', 
                street: '', 
                description: '', 
                phone: '', 
                email: '', 
                imageUrl: '' 
            },
            [e.target.name]: e.target.value || '' // Fallback for undefined value
        }));
    };

    const handleDelete = async (id: number) => {
        await deleteCinema(id);
        fetchCinemas();
    };

    return (
        <div>
            <h1>Admin Cinema Management</h1>
            <form onSubmit={handleFormSubmit}>
                {/* Example input for name, add inputs for other fields */}
                <input
                    name="name"
                    value={selectedCinema?.name ?? ''}
                    onChange={handleInputChange}
                    placeholder="Cinema Name"
                />
                {/* Add more inputs for cinema details */}
                <button type="submit">Save Cinema</button>
            </form>
            <ul>
                {cinemas.map(cinema => (
                    <li key={cinema.id}>
                        {cinema.name} - <button onClick={() => setSelectedCinema(cinema)}>Edit</button> <button onClick={() => handleDelete(cinema.id!)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

