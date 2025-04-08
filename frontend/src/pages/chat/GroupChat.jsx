import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function GroupChat() {
  const { groupBetId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const chatEndRef = useRef(null)

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/chat/${groupBetId}/messages/`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setMessages(res.data)
    } catch (err) {
      console.error('Error loading messages')
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    try {
      await axios.post(`http://localhost:8000/chat/${groupBetId}/messages/`, {
        content: newMessage
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setNewMessage('')
      fetchMessages()
    } catch (err) {
      console.error('Error sending message')
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Group Chat</h2>
      <div className="border h-64 overflow-y-scroll p-2 mb-2 bg-gray-100">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender_username}</strong>: {msg.content}
            <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border p-2"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  )
}

