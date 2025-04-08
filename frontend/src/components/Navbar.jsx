import React from 'react'
export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/IconOnly_Transparent_NoBuffer.png" alt="Logo" className="h-8" />
        <span className="font-bold text-xl">MY WAGER</span>
      </div>
      <div>
        {user ? (
          <>
            <span className="text-sm mr-4">{user.email} | Balance: ${user.balance}</span>
            <button onClick={() => { localStorage.clear(); window.location.reload() }} className="text-red-400">Logout</button>
          </>
        ) : (
          <>
            <a href="/login" className="mr-2">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </nav>
  )
}