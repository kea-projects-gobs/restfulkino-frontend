import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../generic-components/InputField';

export default function CreateUserForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleCreateUser = () => {
    // Tilføj logik til at oprette brugeren
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repeat Password:', repeatPassword);
  };

  return (
    <div>
      <InputField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Phone Number"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label="Repeat Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button onClick={handleCreateUser} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4">
        Create User
      </button>

      <div className="mt-2">
        Already have an account? <Link to="/login" className="text-blue-500 font-bold">Login instead!</Link>
      </div>
    </div>
  );
}