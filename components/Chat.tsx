"use client"
import React, { useState } from 'react';
import ChatIcon from './ChatIcon';

const Chat = ({ paperId }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendQuestion = async () => {
    // ... (keep the existing handleSendQuestion logic)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="absolute right-4 top-16 w-[400px] h-[500px] bg-white border border-gray-300 rounded-lg shadow-md overflow-y-auto">
          <div className="messages flex-grow overflow-y-auto space-y-4 mb-4">
            {/* ... (keep the existing messages rendering logic) */}
          </div>
          <div className="input-container flex items-center space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about the paper..."
              className="flex-grow p-2 border border-gray-300 rounded-lg"
              disabled={loading}
            />
            <button
              onClick={handleSendQuestion}
              disabled={loading}
              className="p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
