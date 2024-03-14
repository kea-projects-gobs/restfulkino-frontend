import { useEffect, useState } from 'react';
import { getMovies, createMovie, updateMovie, deleteMovie } from '../moviepage/MovieUtils';
import { Link } from 'react-router-dom';
import { Movie } from '../../interfaces/interfaces';
import Modal from '../../generic-components/Modal';
import InputField from '../../generic-components/InputField';

export function MovieManager() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete'>('create');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await getMovies();
    setMovies(response.data);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'edit' && selectedMovie && selectedMovie.id) {
      await updateMovie(selectedMovie.id, selectedMovie);
    } else if (modalType === 'create' && selectedMovie) {
      await createMovie(selectedMovie);
    }
    fetchMovies();
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedMovie(prev => ({
      ...prev,
      [name]: value
    } as Movie));
  };

  const openModal = (type: 'create' | 'edit' | 'delete', movie?: Movie) => {
    setModalType(type);
    setSelectedMovie(movie || null);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedMovie && selectedMovie.id) {
      await deleteMovie(selectedMovie.id);
      fetchMovies();
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">Movie Management</h1>
      <button onClick={() => openModal('create')} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add New Movie
      </button>

      <ul className="mt-6">
        {movies.map((movie) => (
          <li key={movie.id} className="flex justify-between items-center bg-white shadow px-4 py-2 rounded-lg mt-2">
            <span className="font-medium text-gray-800">
              <Link to={`/schedules/movies/${movie.id}`} className='hover:underline'>
                {movie.title}
                </Link>
              </span>
            <div>
              <button onClick={() => openModal('edit', movie)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2">
                Edit
              </button>
              <button onClick={() => openModal('delete', movie)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Movie`}>
        {modalType !== 'delete' ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <InputField label="Title" name="title" value={selectedMovie?.title ?? ""} onChange={handleInputChange} placeholder="Movie Title" required />
            <InputField label="Description" name="description" value={selectedMovie?.description ?? ""} onChange={handleInputChange} placeholder="Description" required />
            <InputField label="Release date" name="releaseDate" value={selectedMovie?.releaseDate ?? ""} onChange={handleInputChange} placeholder="Release Date" required />
            <InputField label="Duration" name="duration" value={selectedMovie?.duration ?? ""} onChange={handleInputChange} placeholder="Duration (in minutes)" type="number" />
            <InputField label="Image URL" name="imageUrl" value={selectedMovie?.imageUrl ?? ""} onChange={handleInputChange} placeholder="Image URL" />
            <InputField label="Language" name="language" value={selectedMovie?.language ?? ""} onChange={handleInputChange} placeholder="Language" />
            <InputField label="Genres" name="genre" value={selectedMovie?.genre ?? ""} onChange={handleInputChange} placeholder="Genres" required/>
            <InputField label="Director" name="director" value={selectedMovie?.director ?? ""} onChange={handleInputChange} placeholder="Director" />
            <InputField label="Cast" name="cast" value={selectedMovie?.cast ?? ""} onChange={handleInputChange} placeholder="Cast" />
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {modalType === 'create' ? 'Create Movie' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div>
            <p>Are you sure you want to delete the following movie?</p>
            <h2 className="text-lg font-bold">{selectedMovie?.title}</h2>
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