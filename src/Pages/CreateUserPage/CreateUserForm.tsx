import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../generic-components/InputField';
import { createUserWithRole } from './createService';

export default function CreateUserForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const userData = {
        email: email,
        username: username,
        password: password,
        //repeatPassword: repeatPassword,
      };
      const response = await createUserWithRole(userData);
      console.log('Response:', response);
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error);
      //setError("Failed to create user."); // Set an error state to inform the user
    }
  };

  return (
    <div>
      {/* <InputField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
      {/* <InputField
        label="Phone Number"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      /> */}
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      {/* <InputField
        label="Repeat Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      /> */}
      <button onClick={handleCreateUser} className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4">
        Create User
      </button>

      <div className="mt-2">
        Already have an account? <Link to="/login" className="text-blue-500 font-bold">Login instead!</Link>
      </div>
    </div>
  );
}