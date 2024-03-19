import { createContext, useContext, useState, ReactNode } from "react";
import { authProvider, LoginRequest, LoginResponse, User } from "./authUtils";
import axiosWithAuth from "./axios";
import axios from "axios";

interface AuthContextType {
  username: string|null;
  signIn: (user: User) => Promise<LoginResponse>;
  signOut: () => Promise<void>;
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
}


const AuthContext = createContext<AuthContextType |null>(null);


export default function AuthProvider({ children }: { children: ReactNode }) {
  //We use this to distinguish between being logged in or not
  const initialUsername = localStorage.getItem("username")||null
  const [username, setUsername] = useState<string | null>(initialUsername);
 
  const signIn = async (user_: LoginRequest) => {
    return authProvider.signIn(user_).then((user) => {
      setUsername(user.username)
      localStorage.setItem("username",user.username)
      localStorage.setItem("roles",JSON.stringify(user.roles))
      localStorage.setItem("token",user.token)
      return user;
    });
  };


  // Invalidate token in backend, and remove userinfo from localstorage
  const signOut = async () => {
    try {
      await axiosWithAuth.post("/auth/logout");
      console.log("User logged out successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // If the error is due to an expired token, proceed with client-side cleanup
        console.log("Token expired, but proceeding with logout on client side.");
      } else {
        console.error("Failed to log out", error);
      }
    }
    // Proceed with client-side cleanup
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
  };


  // If certain actions require a user to have multiple specific roles - we might need to change/adjust this logic
  function isLoggedIn() {
    return username != null;
  }


  function isLoggedInAs(role: string[]) {
    const roles:Array<string> = JSON.parse(localStorage.getItem("roles") || '[]');
    return roles?.some((r) => role.includes(r)) || false;
  }


  const value = { username, isLoggedIn, isLoggedInAs, signIn, signOut };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  return useContext(AuthContext);
}


