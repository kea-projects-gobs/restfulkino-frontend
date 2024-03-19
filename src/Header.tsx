import { useAuth } from "./security/AuthProvider";
import AuthStatus from "./security/AuthStatus";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();


return (
  <header className="bg-gray-900 text-white rounded-lg shadow-lg">
    <div className="container mx-auto py-6 px-6 flex justify-between items-center">
      <h1 className="text-4xl ">CinemaApp</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a href="MoviePage" className="hover:text-gray-300">
              Program
            </a>
          </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Coming soon
              </a>
            </li>
              <AuthStatus />
          <li>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  );
}

