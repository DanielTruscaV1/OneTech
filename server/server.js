const express = require('express');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createDocument, getDocumentById, getAllDocuments, getUserById, createUser, registerUser } = require('./database');
const cors = require('cors');
const app = express();
const encoder = require('./encoder');
const port = 3000; // You can change the port number as needed

const validApiKeys = [process.env.VITE_VALID_API_KEY];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['api-key'];

  // Check if API key is provided
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  // Check if API key is valid
  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  // API key is valid, proceed to next middleware
  next();
};

app.use(express.json());

app.use(cors());

app.use(limiter);

//app.use(apiKeyMiddleware);

app.get('/api/documents', async (req, res) => {
    const collection = 'Users';
    const result = await getAllDocuments(collection);
    res.json(result);
  });

  app.get('/api/posts', async (req, res) => {
    const collection = 'Posts';
    const result = await getAllDocuments(collection);
    res.json(result);
  });
  app.get('/api/sessions', async (req, res) => {
    const collection = 'Sessions';
    const result = await getAllDocuments(collection);
    res.json(result);
  });

  app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await registerUser(email, password);
      if(result.status === 201)
        res.status(201).json({ message: 'Sign-in successfull.', result});
      else 
        throw Error("Invalid info.");
    } catch (error) {
      res.status(400).send('Sign-in failed: ' + error.message);
    }
});

  app.post('/api/signup', async (req, res) => {
    const { firstName, lastName , email, password } = req.body;
  
    if (!firstName || !lastName ||  !email || !password) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }
  
    try {
      const user = await createUser(firstName, lastName, email, password);
  
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
