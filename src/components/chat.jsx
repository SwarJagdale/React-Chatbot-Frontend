import React, { useState } from 'react';
import { Chat } from 'react-chat-module';
import 'react-chat-module/dist/index.css';

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const chatbot = (userMessage) => {
    const data = {
      chat_text: userMessage,
      conversation: messages.map((msg) => msg.text),
    };

    fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const chatbotMessage = {
          type: 'text',
          text: data['Chat: '],
          senderId: '2', // Assuming "2" represents the chatbot
          createdAt: new Date(),
        };

        // Update the state by appending the new chatbot message
        setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSend = (message) => {
    // Create a new user message
    const userMessage = {
      type: 'text',
      text: message.text,
      senderId: '1', // Assuming "1" represents the user
      createdAt: new Date(),
    };

    // Update the state by appending the new user message
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Call the chatbot function with the user's message
    chatbot(message.text);
  };

  return <Chat userId="1" messages={messages} onSend={handleSend} />;
}

export default ChatComponent;
