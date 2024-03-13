import { useState } from 'react';
import InputField from '../../generic-components/InputField';
export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Her kan du tilføje logik til at behandle login, f.eks. kalde en API eller udføre validering
    console.log('Username:', username);
    console.log('Password:', password);
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
      <button onClick={handleLogin} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4">
        Login
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 font-bold ml-2">
        Create User
      </button>
    </div>
  );
}
