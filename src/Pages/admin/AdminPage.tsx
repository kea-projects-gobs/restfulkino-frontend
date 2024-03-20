import  { useState } from 'react';
import { CinemaManager } from './CinemaManager';
import { HallManager } from './HallManager';
import { MovieManager } from './MovieManager';
import { ScheduleManager } from './ScheduleManager';
import { useAuth } from '../../security/AuthProvider';

export default function AdminPage() {
  const auth = useAuth();
  
  // Determine the intial tab, based on role
  const getInitialTab = (): 'cinemas' | 'halls' | 'movies' | 'schedules' => {
    if (auth?.isLoggedInAs(["ADMIN"])) {
      return 'cinemas'; // Default tab for admins
    } else if (auth?.isLoggedInAs(["EMPLOYEE"])) {
      return 'movies'; // Default tab for employees
    }
    return 'movies'; // Fallback default
  };

  const [activeTab, setActiveTab] = useState<'cinemas' | 'halls' | 'movies' | 'schedules'>(getInitialTab());

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 max-w-5xl m-auto justify-center sm:flex-nowrap">
        {auth?.isLoggedInAs(["ADMIN"]) && (
      <>
        <button
          onClick={() => setActiveTab('cinemas')}
          className={`flex-1 py-2 px-4 font-bold ${activeTab === 'cinemas' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l`}
        >
          Manage Cinemas
        </button>
        <button
          onClick={() => setActiveTab('halls')}
          className={`flex-1 py-2 px-4 font-bold ${activeTab === 'halls' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r`}
        >
          Manage Halls
        </button>
      </>
        )}
        {auth?.isLoggedInAs(["ADMIN","EMPLOYEE"]) && (
      <>
        <button
        onClick={() => setActiveTab('movies')}
        className={`flex-1 py-2 px-4 font-bold ${activeTab === 'movies' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r`}
        >
        Manage Movies
        </button>
        <button
        onClick={() => setActiveTab('schedules')}
        className={`flex-1 py-2 px-4 font-bold ${activeTab === 'schedules' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r`}
        >
        Manage Schedules
        </button>
        </>
        )}
      </div>

      {activeTab === 'cinemas' && <CinemaManager />}
      {activeTab === 'halls' && <HallManager />}
      {activeTab === 'movies' && <MovieManager />}
      {activeTab === 'schedules' && <ScheduleManager />}
    </div>
  );
}
