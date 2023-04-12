const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const createFlashcard = require('../models/User');
dotenv.config();

// ...

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ message: 'Logged in successfully.', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user.', error });
  }
});

router.get('/cards',  async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user.cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards.', error });
  }
});

router.post('/cards',  async (req, res) => {
  try {
    const { front, back } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newCard = { front, back };
    user.cards.push(newCard);
    await user.save();

    res.status(201).json({ message: 'Card added successfully.', card: newCard });
  } catch (error) {
    res.status(500).json({ message: 'Error adding card.', error });
  }
});

router.put('/cards/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const { front, back } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const cardIndex = user.cards.findIndex((card) => card._id.toString() === id);
    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Card not found.' });
    }

    user.cards[cardIndex].front = front;
    user.cards[cardIndex].back = back;
    await user.save();

    res.status(200).json({ message: 'Card updated successfully.', card: user.cards[cardIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating card.', error });
  }
});

router.delete('/cards/:id',  async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const cardIndex = user.cards.findIndex((card) => card._id.toString() === id);
    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Card not found.' });
    }

    user.cards.splice(cardIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Card deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card.', error });
  }
});
    
    module.exports = router;
