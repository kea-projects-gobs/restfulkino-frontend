import  { useState } from 'react';
import { CinemaManager } from './CinemaManager';
import { HallManager } from './HallManager';
import { MovieManager } from './MovieManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'cinemas' | 'halls' | 'movies'>('cinemas');

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('cinemas')}
          className={`py-2 px-4 font-bold ${activeTab === 'cinemas' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
        >
          Manage Cinemas
        </button>
        <button
          onClick={() => setActiveTab('halls')}
          className={`py-2 px-4 font-bold ${activeTab === 'halls' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r`}
        >
          Manage Halls
        </button>
        <button
        onClick={() => setActiveTab('movies')}
        className={`py-2 px-4 font-bold ${activeTab === 'movies' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r`}
        >
        Manage Movies
        </button>
      </div>

      {activeTab === 'cinemas' && <CinemaManager />}
      {activeTab === 'halls' && <HallManager />}
      {activeTab === 'movies' && <MovieManager />}
    </div>
  );
}
