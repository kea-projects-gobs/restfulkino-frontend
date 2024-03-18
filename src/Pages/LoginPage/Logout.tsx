import { useAuth } from "../../security/AuthProvider";
import { Navigate } from "react-router-dom";


export default function Logout() {
  const auth = useAuth();
  if (auth){
      auth.signOut()
      return <Navigate to="/login" replace= {true} />;
  }
}
