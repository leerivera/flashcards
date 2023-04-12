import React, { useState } from 'react';
import axios from 'axios';

const CreateFlashcard = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');
    
    // Log the authToken and headers object
    console.log('authToken:', authToken);
    console.log('headers:', { Authorization: `Bearer ${authToken}` });
  
    try {
      const response = await axios.post(
        '/users/cards',
        { front, back },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setMessage('Flashcard created successfully.');
      setFront('');
      setBack('');
    } catch (error) {
      setMessage(
        `Error creating flashcard. Status: ${error.response.status}, Message: ${error.response.data.message}`
      );
    }
  };

  return (
    <div>
      <h2>Create Flashcard</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
        <input
          type="text"
          placeholder="Back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />
        <button type="submit">Create Flashcard</button>
      </form>
    </div>
  );
};

export default CreateFlashcard;
