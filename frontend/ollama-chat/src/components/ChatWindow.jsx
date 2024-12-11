// src/components/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';

function ChatWindow({ id, onClose, updateModel ,messages = [], model = 'llama3:8b', isLoading = false }){

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const changeModel = (model) => {
    updateModel(model);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <select
          value={model}
          onChange={(e) => changeModel(e.target.value)}
          className="text-sm border rounded p-1"
        >
          <option value="phi3.5:latest">Phi3</option>
          <option value="llama3:8b">LLama3:8b</option>
        </select>
        <button
          onClick={() => onClose(id)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
{/* 
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default ChatWindow;