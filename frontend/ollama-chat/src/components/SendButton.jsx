// src/components/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from './ChatWindow';
function SendButton({ id }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('llama3:8b');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [...messages, newMessage]
        }),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      // Check if we have a valid response with content
      if (data && data?.response?.message?.content) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response.message.content
        }]);
      } else if (data) {  // Direct message format
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message.content
        }]);
      } else {
        console.error('Invalid response format:', data);
        // Optionally show an error message to the user
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request.'
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, an error occurred while processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
   <div>

   {
            <ChatWindow
              key={1}
              id={1}
            
              messages={messages}
              isLoading={isLoading}
              model={model}
              updateModel={setModel}
            />
         }
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
      </div>
   </div>
    </div>

     
  );
}

export default ChatWindow;