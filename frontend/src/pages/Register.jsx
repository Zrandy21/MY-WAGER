import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("🔥 Submitting register form", { username, email, password });

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/users/register/`, {
        username,
        email,
        password
      });

      console.log("✅ Registered:", res.data);
      navigate('/login');
    } catch (err) {
      console.error("❌ Registration failed", err);
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-2 border"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

