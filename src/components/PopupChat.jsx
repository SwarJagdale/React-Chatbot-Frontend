// PopupChat.js
import React, { useState } from 'react';
import ChatComponent from './chat.jsx';

function PopupChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState); // Toggle the chat open/close
  };

  // Handle closing the chat when clicking outside the chat button
  const handleChatButtonClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating
    toggleChat(); // Toggle the chat open/close
  };

  return (
    <div onClick={toggleChat}>
      <button onClick={handleChatButtonClick}>Open Chat</button>
      {isChatOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <ChatComponent />
        </div>
      )}
    </div>
  );
}

export default PopupChat;
