// src/App.jsx
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import SendButton from './components/SendButton'
function App() {
  const [chatWindows, setChatWindows] = useState([{ id: 1 }]);
  
  const addChatWindow = () => {
    setChatWindows(prev => [...prev, { id: Date.now() }]);
  };

  const removeChatWindow = (id) => {
    setChatWindows(prev => prev.filter(window => window.id !== id));
  };

  return (
    <div className="h-screen flex">
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-end p-4"> {/* Add new div for button */}
        <button
          onClick={addChatWindow}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          +
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-auto">
          {/* {chatWindows.map(window => (
            <ChatWindow
              key={window.id}
              id={window.id}
              onClose={removeChatWindow}
            />
          ))} */}

          <SendButton />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;