import React, { useState } from 'react';
import axios from 'axios';


const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'; // API endpoint for the GPT-3.5 model
const API_KEY = process.env.REACT_APP_API_KEY;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = async () => {
    
    if (userInput.trim() === '') return;

    // Include the user message in the messages state
    const newMessage = { role: 'user', content: userInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput('');

    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          model: 'gpt-3.5-turbo',
          messages: [...messages, newMessage].map((message) => ({ role: message.role, content: message.content })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const assistantMessage = response.data.choices[0].message.content;
      // Include the assistant message in the messages state
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error occurred while fetching the response:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === 'user' ? <strong>You: </strong> : <strong>Assistant: </strong>}
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
