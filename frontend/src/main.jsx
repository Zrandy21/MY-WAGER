import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateBet from './pages/bets/CreateBet'
import BetHistory from './pages/bets/BetHistory'
import AllBets from './pages/bets/AllBets'
import GroupChat from './pages/chat/GroupChat'
import AdminDashboard from './pages/admin/AdminDashboard'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Navbar />
    <Toaster position="top-center" />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bets/create" element={<CreateBet />} />
      <Route path="/bets/history" element={<BetHistory />} />
      <Route path="/bets/all" element={<AllBets />} />
      <Route path="/chat/:groupBetId" element={<GroupChat />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </Router>
)