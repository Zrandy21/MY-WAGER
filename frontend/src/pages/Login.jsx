import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/login/', {
        email,
        password
      })
      localStorage.setItem('token', response.data.access)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-2 mb-2 border" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 mb-4 border" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </div>
  )
}