const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// ...

router.post('/register', async (req, res) => {
  // Implement user registration logic
});

router.post('/login', async (req, res) => {
  // Implement user login logic
});

router.get('/cards', async (req, res) => {
  // Implement get cards logic
});

router.post('/cards', async (req, res) => {
    // Implement add card logic
    });
    
    router.put('/cards/:id', async (req, res) => {
    // Implement update card logic
    });
    
    router.delete('/cards/:id', async (req, res) => {
    // Implement delete card logic
    });
    
    module.exports = router;
