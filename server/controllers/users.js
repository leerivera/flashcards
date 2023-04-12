const User = require('../models/User');
const Flashcard = require('../models/Flashcard');
const jwt = require('jsonwebtoken');

// ...existing registerUser and loginUser functions...

const createFlashcard = async (req, res) => {
  try {
    const { front, back } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newFlashcard = new Flashcard({
      front,
      back,
      user: req.user.id
    });

    await newFlashcard.save();
    res.status(201).json({ message: 'Flashcard created', flashcard: newFlashcard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  
  createFlashcard
};
