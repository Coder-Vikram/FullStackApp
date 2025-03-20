import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatPage.css';

function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [senderId, setSenderId] = useState('1'); // Set senderId (e.g., logged-in user)
  const [receiverId, setReceiverId] = useState('2'); // Set receiverId (e.g., chat partner)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5164/api/messages/getBetweenUsers?senderId=${senderId}&receiverId=${receiverId}`);
        setChatMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [senderId, receiverId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = { senderId, receiverId, content: message };
      try {
        await axios.post('http://localhost:5164/api/messages/send', newMessage);
        setChatMessages([...chatMessages, newMessage]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-navbar">
        <div className="chat-navbar-brand">S-Connect</div>
      </div>

      <div className="chat-layout">
        <div className="main-content">
          <h1>Stay Connected</h1>
        </div>

        <div className="chat-box">
          <div className="message-display">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.senderId === senderId ? 'sent' : 'received'}`}>
                {msg.content}
              </div>
            ))}
          </div>

          <div className="message-input-area">
            <input
              type="text"
              className="message-input"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;