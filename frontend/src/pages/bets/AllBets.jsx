import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AllBets() {
  const [bets, setBets] = useState([])

  const joinGroup = async (betId) => {
    try {
      await axios.post(`http://localhost:8000/bets/group/${betId}/join/`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      alert('Joined group bet!')
    } catch (err) {
      alert('Could not join group bet')
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/bets/list/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => setBets(res.data))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Bets</h2>
      {bets.map(bet => (
        <div key={bet.id} className="border p-4 mb-2">
          <p><strong>Description:</strong> {bet.description}</p>
          <p><strong>Amount:</strong> ${bet.amount}</p>
          <p><strong>Group Bet:</strong> {bet.is_group_bet ? 'Yes' : 'No'}</p>
          {!bet.is_settled && bet.is_group_bet && (
            <button onClick={() => joinGroup(bet.id)} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
              Join Group Bet
            </button>
          )}
        </div>
      ))}
    </div>
  )
}