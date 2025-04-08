import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminDashboard() {
  const [summary, setSummary] = useState({ total_users: 0, total_bets: 0, total_revenue: 0 })

  const fetchSummary = async () => {
    try {
      const res = await axios.get('http://localhost:8000/analytics/summary/', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setSummary(res.data)
    } catch (err) {
      alert('Access denied or error fetching admin stats.')
    }
  }

  const exportCSV = async () => {
    try {
      const res = await axios.get('http://localhost:8000/analytics/export/csv/', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'transactions.csv')
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      alert('Failed to export CSV')
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="bg-white shadow p-4 rounded mb-4">
        <p><strong>Total Users:</strong> {summary.total_users}</p>
        <p><strong>Total Bets:</strong> {summary.total_bets}</p>
        <p><strong>Total Revenue:</strong> ${summary.total_revenue}</p>
      </div>
      <button onClick={exportCSV} className="bg-green-700 text-white px-4 py-2 rounded">
        Export Transactions (CSV)
      </button>
    </div>
  )
}