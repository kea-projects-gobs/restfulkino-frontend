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
              <NavLink to="/" className="hover:text-gray-300">
                Program
              </NavLink>
            </li>
            <li>
              <NavLink to="/comingsoon" className="hover:text-gray-300">
                Coming soon
              </NavLink>
            </li>
            <AuthStatus />
            <li>
              <NavLink to="/about" className="hover:text-gray-300">
                About
              </NavLink>
            </li>
            {auth?.isLoggedInAs(["ADMIN"]) && (
              <li>
                <NavLink to="/admin" className="hover:text-gray-300">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
