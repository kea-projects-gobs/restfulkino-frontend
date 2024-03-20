import { useAuth } from "./AuthProvider";
import { NavLink, Link } from "react-router-dom";

export default function AuthStatus() {
    const auth = useAuth();
  
    if (!auth?.isLoggedIn()) {
       return (
         <li>
           <NavLink to="/login">Log ind</NavLink>
         </li>
       );
     } else {
       return (
         <li>
           <Link to="/logout">Log ud ({auth.username}) </Link>
         </li>
       );
     }
   }
