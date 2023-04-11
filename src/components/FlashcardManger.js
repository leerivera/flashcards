import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlashcardManager = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await axios.get('/users/cards', {
          headers:          { Authorization: `Bearer ${authToken}` },
        });
        setCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <h2>Flashcard Manager</h2>
      {cards.map((card) => (
        <div key={card._id}>
          <p>Front: {card.front}</p>
          <p>Back: {card.back}</p>
        </div>
      ))}
    </div>
  );
};

export default FlashcardManager;

