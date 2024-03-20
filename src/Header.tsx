import { useState } from 'react';
import { useAuth } from "./security/AuthProvider";
import AuthStatus from "./security/AuthStatus";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="container mx-auto py-6 px-6 flex justify-between items-center">
        <h1 className="text-4xl">Restful Kino</h1>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <NavLink to="/" className="hover:text-gray-300">
                Program
              </NavLink>
            </li>
            <li>
              <NavLink to="/comingsoon" className="hover:text-gray-300">
                Kommende film
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-gray-300">
                Om os
              </NavLink>
            </li>
            {auth?.isLoggedInAs(["ADMIN", "EMPLOYEE"]) && (
              <li>
                <NavLink to="/admin" className="hover:text-gray-300">
                  Admin
                </NavLink>
              </li>
            )}
            <li>
              <AuthStatus />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};