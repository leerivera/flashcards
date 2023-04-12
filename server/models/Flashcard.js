const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);
