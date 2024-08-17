const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const uri = `mongodb+srv://danieltrusca2008:${process.env.VITE_MONGODB_PASSWORD}@cluster0.y1sc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = client.db('OneTech');

async function connectToDatabase() {
  if (!db) {
    await client.connectToDatabase();
    db = client.db('OneTech'); // Replace with your database name
    console.log("MongoDB database connected successfully.");
  }
}

// Collections
const users = db.collection('Users');
const posts = db.collection('Posts');
const comments = db.collection('Comments');
const articles = db.collection('Articles');
const problems = db.collection('Problems');
const submissions = db.collection('Submissions');

// Example function to create a new document
async function createDocument(collectionName, data) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    console.log('Document created:', result.insertedId);
    return result;
  } catch (error) {
    console.error('Error creating document:', error);
  }
}

// Example function to retrieve a document by its ID
async function getDocumentById(collectionName, id) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
    console.log('Document retrieved:', result);
    return result;
  } catch (error) {
    console.error('Error retrieving document:', error);
  }
}

// Get all documents from a collection
async function getAllDocuments(collectionName) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();
    console.log(`All documents fetched from ${collectionName} collection.`);
    return result;
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName} collection:`, error);
  }
}

// Get a user by ID
async function getUserById(id) {
  try {
    await connectToDatabase(); // Ensure you are getting the collection
    const user = await users.findOne({ user_id: id });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Create a user
async function createUser(username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: uuidv4(), // MongoDB does not use UUIDs for _id by default, consider using ObjectId
      username,
      email,
      password: hashedPassword,
      followedUsers: [],
      followedBy: [],
      posts: []
    };
    const result = await users.insertOne(newUser);
    return result.ops[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Register a user (login)
async function registerUser(email, password) {
  try {
    const user = await users.findOne({ email });
    if (!user) {
      console.log('User not found.');
      throw new Error('Invalid info.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
      return { token, user_id: user._id };
    } else {
      console.log('Invalid info.');
      throw new Error('Invalid info.');
    }
  } catch (error) {
    console.log('Error at user sign-in:', error);
    return error instanceof Error ? error.message : 'An unknown error occurred';
  }
}

// Update a user (follow/unfollow another user)
async function updateUser(userId, targetUserId) {
  try {
    const user = await users.findOne({ _id: ObjectId.createFromHexString(userId) });
    const targetUser = await users.findOne({ _id: ObjectId.createFromHexString(targetUserId) });

    if (user && targetUser) {
      await users.updateOne(
        { _id: ObjectId.createFromHexString(userId) },
        { $addToSet: { followedUsers: targetUserId } }
      );
      await users.updateOne(
        { _id: ObjectId.createFromHexString(targetUserId) },
        { $addToSet: { followedBy: userId } }
      );
    }

    return { user, targetUser };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Update user information
async function updateUserInfo(userId, data) {
  try {
    const updateData = {
      ...data,
      $set: {
        image: data.image || null,
        username: data.username || null,
        description: data.description || null,
        location: data.location || null,
        language: data.language || null
      }
    };
    const result = await users.updateOne({ _id: ObjectId.createFromHexString(userId) }, { $set: updateData });
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

// Update post information
async function updatePostInfo(postId, data) {
  try {
    const post = await posts.findOne({ _id: ObjectId.createFromHexString(postId) });
    if (post) {
      const updateData = {
        ...data,
        $set: {
          likes: data.likes || post.likes,
          likedBy: data.likes > post.likes ? { $addToSet: data.user_id } : { $pull: data.user_id }
        }
      };
      const result = await posts.updateOne({ _id: ObjectId.createFromHexString(postId) }, { $set: updateData });
      return result;
    }
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

// Get followers
async function getFollowers(userId) {
  try {
    const user = await users.findOne({ _id: ObjectId.createFromHexString(userId) });
    if (user) {
      const followers = await users.find({ _id: { $in: user.followedBy } }).toArray();
      const posts = await posts.find({ _id: { $in: user.posts } }).toArray();
      return { followers, posts };
    }
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
}

// Get home information
async function getHomeInfo(userId) {
  try {
    const user = await users.findOne({ _id: ObjectId.createFromHexString(userId) });
    if (user) {
      const followedUsers = await users.find({ _id: { $in: user.followedUsers } }).toArray();
      const allUsers = await users.find().toArray();
      const posts = await posts.find().toArray();
      return { followedUsers, allUsers, posts };
    }
  } catch (error) {
    console.error('Error fetching home info:', error);
  }
}

// Create a post
async function createPost(userId, data) {
  try {
    const uniqueId = uuidv4();
    const post = {
      _id: uniqueId,
      author_id: userId,
      date: new Date(),
      ...data,
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      likedBy: []
    };
    const result = await posts.insertOne(post);
    await users.updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      { $addToSet: { posts: uniqueId } }
    );
    return result;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Delete a post
async function deletePost(postId) {
  try {
    const post = await posts.findOne({ _id: ObjectId.createFromHexString(postId) });
    if (post) {
      const userId = post.author_id;
      await posts.deleteOne({ _id: ObjectId.createFromHexString(postId) });
      await users.updateOne(
        { _id: ObjectId.createFromHexString(userId) },
        { $pull: { posts: postId } }
      );
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// Create a comment
async function createComment(postId, authorId, content) {
  try {
    const uniqueId = uuidv4();
    const user = await users.findOne({ _id: ObjectId.createFromHexString(authorId) });
    if (user) {
      const comment = {
        _id: uniqueId,
        post_id: postId,
        author_id: authorId,
        author_image: user.image,
        author_username: user.username,
        content,
        likes: 0,
        date: new Date()
      };
      const result = await comments.insertOne(comment);
      return result;
    }
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

// Get comments for a post
async function getComments(postId) {
  try {
    const commentsList = await comments.find({ post_id: postId }).toArray();
    return commentsList;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

// Get all articles
async function getArticles() {
  try {
    const articlesList = await articles.find().toArray();
    return articlesList;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

// Get article by ID
async function getArticleById(articleId) {
  try {
    const article = await articles.findOne({ _id: ObjectId.createFromHexString(articleId) });
    return article;
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    throw error;
  }
}

// Get all problems
async function getProblems() {
  try {
    const problemsList = await problems.find().toArray();
    return problemsList;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
}

// Create a submission
async function createSubmission(problemId, userId, code) {
  try {
    const uniqueId = uuidv4();
    const submission = {
      _id: uniqueId,
      problem_id: problemId,
      user_id: userId,
      code,
      date: new Date()
    };
    const result = await submissions.insertOne(submission);
    return result;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
}

// Get a user's submissions
async function getUserSubmissions(userId) {
  try {
    const submissionsList = await submissions.find({ user_id: userId }).toArray();
    return submissionsList;
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    throw error;
  }
}

async function getChatByIds(user1_id, user2_id) {
  try {
    await connectToDatabase();
    const chat = await db.collection('Chats').find({
      $or: [
        { users: [user1_id, user2_id] },
        { users: [user2_id, user1_id] }
      ]
    }).toArray();
    return chat;
  } catch (error) {
    console.log("Database error: ", error);
    throw error;
  }
}

async function getProblemById(problem_id) {
  try {
    await connectToDatabase();
    const problem = await db.collection('Problems').findOne({ _id: ObjectId.createFromHexString(problem_id) });
    return problem;
  } catch (error) {
    console.log("Database error: ", error);
    throw error;
  }
}

async function updateUserById(userId, newUserData) {
  try {
    await connectToDatabase();
    const sanitizedUserId = sanitizeUserId(userId);

    const result = await db.collection('Users').findOne({ user_id: sanitizedUserId });
    if (!result) {
      throw new Error('User not found');
    }

    const updatedData = {
      ...result,
      ...newUserData,
    };

    const updatedUser = await db.collection('Users').updateOne(
      { user_id: sanitizedUserId },
      { $set: updatedData }
    );

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}


module.exports = {
  createDocument,
  getDocumentById,
  getAllDocuments,
  getUserById,
  createUser,
  registerUser,
  updateUser,
  updateUserInfo,
  getFollowers,
  updatePostInfo,
  getHomeInfo,
  createPost,
  deletePost,
  createComment,
  getComments,
  getArticles,
  getArticleById,
  getChatByIds,
  getProblemById,
  getProblems,
  updateUserById,
  createSubmission,
};