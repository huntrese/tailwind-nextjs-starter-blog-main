'use client'

import { useState } from 'react'

interface ChatBoxProps {
  paperId: string
}

export default function ChatBox({ paperId }: ChatBoxProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleChat = () => setIsChatOpen(!isChatOpen)

  const handleSend = async () => {
    if (!chatInput.trim()) return

    setIsLoading(true)
    setChatHistory((prev) => [...prev, `You: ${chatInput}`])

    try {
      const response = await fetch('http://127.0.0.1:8443/ask-paper-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paper_id: paperId, // Correctly use the paperId prop
          question: chatInput,
        }),
      })

      const data = await response.json()
      if (data.response) {
        setChatHistory((prev) => [...prev, `AI: ${data.response}`])
      } else {
        setChatHistory((prev) => [...prev, 'AI: Error processing your question.'])
      }
    } catch (error) {
      setChatHistory((prev) => [...prev, 'AI: Failed to connect to the server.'])
    } finally {
      setIsLoading(false)
      setChatInput('')
    }
  }

  return (
    <>
      {/* Chat Icon */}
      <div
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full cursor-pointer shadow-lg"
        onClick={toggleChat}
      >
        💬
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold">Chat with AI</h3>
            <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-black space-y-2">
            {chatHistory.map((message, index) => (
              <div key={index} className="text-sm">
                {message}
              </div>
            ))}
            {isLoading && <div className="text-sm text-gray-500">AI is typing...</div>}
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 text-black rounded-md p-2 text-sm"
              placeholder="Type your question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 text-black px-4 py-2 rounded-md text-sm"
              disabled={!chatInput.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
