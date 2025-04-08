import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function BetHistory() {
  const [bets, setBets] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/bets/history/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => setBets(res.data))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bet History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Bet</th>
            <th className="border p-2">Outcome</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {bets.map(b => (
            <tr key={b.id}>
              <td className="border p-2">{b.bet}</td>
              <td className="border p-2">{b.outcome}</td>
              <td className="border p-2">{b.recorded_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}