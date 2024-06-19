const express = require('express');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createDocument, getDocumentById, getAllDocuments, getUserById, createUser, registerUser, updateUser, updateUserInfo, getFollowers, updatePostInfo, getHomeInfo, createPost, deletePost, createComment, getComments, getArticles, getArticleById } = require('./database');
const cors = require('cors');
const app = express();
const encoder = require('./encoder');
const { sendEmail } = require('./emailService');
const port = 3000; // You can change the port number as needed

const validApiKeys = [process.env.VITE_VALID_API_KEY];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
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

app.set('trust proxy', 1);

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
  app.get('/api/emails', async (req, res) => {
    const result = {
      user_id: process.env.VITE_EMAIL_PUBLIC_KEY,
      service_id: process.env.VITE_EMAIL_SERVICE_ID,
      template_id: process.env.VITE_EMAIL_TEMPLATE_ID,
    }
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

  app.put('/api/update_user/:id', async (req, res) => {
    const { id } = req.params;
    const { image, description, location, language } = req.body;
    try {
      const response = await updateUserInfo(id, 
        {
          image,
          description,
          location,
          language,
        }
      )

      res.json(response);
    }
    catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  app.put('/api/update_post/:id', async (req, res) => {
    const { id } = req.params;
    const { likes, comments, shares, saves, user_id } = req.body;
    try {
      const response = await updatePostInfo(id, 
        {
          likes,
          comments,
          shares,
          saves,
          user_id,
        }
      )

      res.json(response);
    }
    catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  app.get('/api/followers/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await getFollowers(id);
      res.json(response);
    } catch(error) {
      console.error('Error fetching user followers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  app.put('/api/follow_user/:user_id/:target_user_id', async (req, res) => {
    const { user_id, target_user_id } = req.params;
    try {
      const response = await updateUser(user_id, target_user_id);
      res.json(response);
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
      {
        res.status(201).json({ message: 'Sign-in successfull.', result});
      }
      else 
        throw Error("Invalid info.");
    } catch (error) {
      res.status(400).send('Sign-in failed: ' + error.message);
    }
});

  app.post('/api/signup', async (req, res) => {
    const { username , email, password, confirm } = req.body;
  
    if (!username || !email ||  !password || !confirm) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }
  
    try {
      const user = await createUser(username, email, password);
  
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/api/getHomeInfo/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try 
    {
      const response = await getHomeInfo(user_id);

      res.json(response);
    }
    catch(error)
    {
      console.log("Back-end (server) error: ", error);
    }
  });

  app.post("/api/createPost/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const { image, title, description, tags } = req.body;
    try {
      const result = await createPost(user_id, {
        image,
        title,
        description,
        tags,
      });

      res.status(201).json({ message: 'Post created successfully.', result});
    } catch (error) {
      res.status(400).send('Post creation failed: ' + error.message);
    }
}); 

  app.delete("/api/deletePost/:post_id", async (req, res) => {
      const { post_id } = req.params;
      try {
        const result = await deletePost(post_id);
  
        res.status(201).json({ message: 'Post deleted successfully.', result});
      } catch (error) {
        res.status(400).send('Post deletion failed: ' + error.message);
      }
  })

  app.post("/api/createComment", async (req, res) => {
    const { post_id, author_id, content } = req.body;

    try {
      const result = await createComment(post_id, author_id, content);

      res.status(201).json({ message: 'Comment created successfully.', result});
    } catch (error) {
      res.status(400).send('Comment creation failed: ' + error.message);
    }
  })

  app.get("/api/getComments/:post_id", async (req, res) => {
    const { post_id } = req.params;

    try {
      const result = await getComments(post_id);

      res.status(201).json({ message: 'Comments fetched successfully.', result});
    } catch (error) {
      res.status(400).send('Comments fetch failed: ' + error.message);
    }
  })

  app.get("/api/getArticles", async (req, res) => {
    try {
      const result = await getArticles();

      res.status(201).json({ message: 'Articles fetched successfully.', result});
    } catch (error) {
      res.status(400).send('Articles fetch failed: ' + error.message);
    }
  })

  app.get("/api/getArticleById/:article_id", async (req, res) => {
    const { article_id } = req.params;

    try {
      const result = await getArticleById(article_id);

      res.status(201).json({ message: 'Article fetched successfully.', result});
    } catch (error) {
      res.status(400).send('Article fetch failed: ' + error.message);
    }
  })

  const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
  const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

  // Configure the S3 client with your credentials and region
  const s3Client = new S3Client({
    region: process.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
  });

  // Function to generate a presigned URL for the image
  const generatePresignedUrl = async (bucketName, objectKey) => {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });

      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 180 }); // URL expires in 1 hour (adjust as needed)

      console.log('Presigned URL:', signedUrl);
      return signedUrl;
    } catch (err) {
      console.error('Error generating presigned URL:', err);
      return null;
    }
  };
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
