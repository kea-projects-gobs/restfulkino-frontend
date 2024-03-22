import { useState } from 'react';
import { useAuth } from "./security/AuthProvider";
import AuthStatus from "./security/AuthStatus";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-400 text-white rounded-lg shadow-lg relative">
      <div className="container mx-auto py-6 px-6 flex justify-between items-center">
        <h1 className="text-4xl">Restful Kino</h1>
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
              <AuthStatus />
          </ul>
        </nav>
        <button className="md:hidden absolute top-6 right-6" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg> // X icon
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg> // Burger icon
          )}
        </button>
      </div>
    </header>
  );
};