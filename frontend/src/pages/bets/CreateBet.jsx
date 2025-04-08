import React from 'react'
import { useState } from 'react'
import axios from 'axios'


export default function CreateBet() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [isGroup, setIsGroup] = useState(false)

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:8000/bets/create/', {
        description,
        amount,
        is_group_bet: isGroup
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      alert('Bet created!')
    } catch (err) {
      alert('Error creating bet')
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a Bet</h2>
      <textarea className="w-full border p-2 mb-2" placeholder="Description"
        value={description} onChange={e => setDescription(e.target.value)} />
      <input className="w-full border p-2 mb-2" type="number" placeholder="Amount"
        value={amount} onChange={e => setAmount(e.target.value)} />
      <label className="flex items-center mb-4">
        <input type="checkbox" checked={isGroup} onChange={() => setIsGroup(!isGroup)} className="mr-2" />
        Group Bet
      </label>
      <button onClick={handleCreate} className="bg-purple-600 text-white px-4 py-2 rounded">Create Bet</button>
    </div>
  )
}