import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../generic-components/InputField';
import { loginUser } from './loginService';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try{
      const userData = { username, password };
      const response = await loginUser(userData);

      console.log("Login successful:", response);
      //Logik til at omridigere bruger til en side hvor der står man er logget ind
    }
    catch(error){
      console.log("Login failed:", error);
      setError(error.message);
    }
  };

  return (
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
      {error && <div className="text-red-500">{error}</div>}
      <button onClick={handleLogin} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4">
        Login
      </button>
      
      <div className="mt-2">
        Don't have an account? <Link to="/createuser" className="text-blue-500 font-bold">Create one instead!</Link>
      </div>
      
    </div>
  );
}
