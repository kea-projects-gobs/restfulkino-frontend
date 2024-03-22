import { useState } from "react";
import { useAuth } from "./security/AuthProvider";
import AuthStatus from "./security/AuthStatus";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative text-white bg-gray-900 rounded-lg shadow-lg">
      <div className="container flex items-center justify-between px-6 py-6 mx-auto">
        <h1 className={`${isMenuOpen ? "hidden" : "block"} md:block text-4xl`}>
          <NavLink to="/" className="hover:text-gray-300">
            KINO
          </NavLink>
        </h1>
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
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
        <button
          className="absolute md:hidden top-6 right-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg> // X icon
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg> // Burger icon
          )}
        </button>
      </div>
    </header>
  );
};
