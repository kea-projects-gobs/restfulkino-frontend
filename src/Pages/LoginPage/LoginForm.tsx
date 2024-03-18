import { useState } from 'react';
import InputField from '../../generic-components/InputField';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../security/AuthProvider';

export default function LoginForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  // Redirects user back to the page they were trying to access
  const from = location.state?.from || { pathname: "/" };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await auth?.signIn({ username, password});
      console.log("Login successful");
      navigate(from); // We need to setup correct navigation
    }
    catch(error){
      console.log("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
    <div>
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* {error && <div className="text-red-500">{error}</div>} */}
      <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4">
        Login
      </button>
      
      <div className="mt-2">
        Don't have an account? <Link to="/createuser" className="text-blue-500 font-bold">Create one instead!</Link>
      </div>
      
    </div>
    </form>
  );
}
