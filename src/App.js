
import React, { useState } from 'react';
import ChatBox from './components/ChatBox';

function App() {
  const [botId] = useState("demo-bot-id");
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Chat Site Assistant</h1>
      <ChatBox botId={botId} />
    </div>
  );
}

export default App;
