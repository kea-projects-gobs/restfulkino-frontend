import { useAuth } from "./security/AuthProvider";
import AuthStatus from "./security/AuthStatus";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();

  return (
    <header className="border-b-[1px] border-border border-solid w-full pb-4 grid grid-cols-2">
      HEADER
      <div className="flex justify-end gap-2">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/comingsoon">Coming Soon</NavLink>
        {auth?.isLoggedInAs(["ADMIN"]) && (
          <NavLink to="/admin">Admin</NavLink>
        )}
        <AuthStatus />
      </div>
    </header>
  );
};