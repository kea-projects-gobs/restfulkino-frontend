import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../generic-components/InputField';
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //tilføj logik til at behandle login
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <InputField
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4">
        Login
      </button>
      
      <div className="mt-2">
        Don't have an account? <Link to="/createuser" className="text-blue-500 font-bold">Create one instead!</Link>
      </div>
      
    </div>
  );
}
