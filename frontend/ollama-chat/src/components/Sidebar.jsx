// src/components/Sidebar.jsx
import React from 'react';

function Sidebar({ isOpen, onToggle, onAddWindow }) {
  return (
    <div className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-16'} transition-all`}>
      <div className="p-4">
        <button
          onClick={onToggle}
          className="text-white hover:text-gray-300"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>
      
      {isOpen && (
        <div className="p-4">
          <button
            onClick={onAddWindow}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            New Chat
          </button>
          
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase">Models</h2>
            <ul className="mt-2 space-y-2">
              <li className="text-gray-300 hover:text-white cursor-pointer">Llama 2</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">Mistral</li>
              <li className="text-gray-300 hover:text-white cursor-pointer">CodeLlama</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;