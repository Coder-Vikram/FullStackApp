import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const connectionRef = useRef(null);
  const alertShownRef = useRef(false);

  useEffect(() => {
    const enteredName = prompt('Enter your name:');
    if (!enteredName) return;
    setUsername(enteredName);

    if (!connectionRef.current) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5164/chathub?username=${encodeURIComponent(enteredName)}`)
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      newConnection.on("ReceiveMessage", (user, message) => {
        setMessages((prev) => [
          ...prev,
          {
            user,
            message,
            isCurrentUser: user === enteredName,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      });

      newConnection
        .start()
        .then(() => {
          console.log('SignalR Connected');
          connectionRef.current = newConnection;
        })
        .catch((error) => {
          console.error('Connection failed:', error);
          if (!alertShownRef.current) {
            alertShownRef.current = true;
            alert('Failed to connect to chat. Please try again later.');
          }
        });
    }

    return () => {
      if (connectionRef.current) {
        connectionRef.current.off("ReceiveMessage");
        connectionRef.current.stop();
        connectionRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.elements.message.value.trim();
    if (!input || !connectionRef.current) return;

    try {
      await connectionRef.current.invoke("SendMessage", username, input);
      e.target.elements.message.value = '';
    } catch (error) {
      console.error('Send failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Chat</h2>
      <div className="card">
        <div className="card-body" style={{ height: '400px', overflowY: 'scroll' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex ${msg.isCurrentUser ? 'justify-content-end' : 'justify-content-start'} mb-2`}
            >
              <div
                className={`p-2 rounded shadow-sm ${msg.isCurrentUser ? 'bg-primary text-white' : 'bg-secondary text-white'}`}
                style={{ maxWidth: '70%' }}
              >
                <strong>{msg.user}</strong> ({msg.time}): {msg.message}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="input-group">
          <input type="text" name="message" className="form-control" placeholder="Type a message..." />
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
