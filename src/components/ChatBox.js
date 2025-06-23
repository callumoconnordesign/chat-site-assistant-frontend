
import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = ({ botId }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Ask me anything about this site." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/chat", {
        bot_id: botId,
        message: input
      });

      setMessages([...newMessages, { from: 'bot', text: res.data.response }]);
    } catch (err) {
      setMessages([...newMessages, { from: 'bot', text: "Error reaching assistant." }]);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc' }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ margin: '10px 0', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
          <strong>{msg.from === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
        </div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '100%', padding: '8px' }}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
    </div>
  );
};

export default ChatBox;
