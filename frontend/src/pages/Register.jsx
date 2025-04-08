import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/users/register/', {
        username,
        email,
        password
      })
      navigate('/login')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full p-2 mb-2 border" />
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-2 mb-2 border" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 mb-4 border" />
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </div>
  )
}