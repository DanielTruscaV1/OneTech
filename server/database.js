// database.js
require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


// Replace with your FaunaDB secret key
const client = new faunadb.Client({
  secret: process.env.VITE_FAUNA_KEY
});

const secretKey = process.env.VITE_JWT_KEY

// Example function to create a new document
async function createDocument(collection, data) {
  try {
    const result = await client.query(
      q.Create(
        q.Collection(collection),
        { data: data }
      )
    );
    console.log('Document created:', result);
    return result;
  } catch (error) {
    console.error('Error creating document:', error);
  }
}

// Example function to retrieve a document by its ID
async function getDocumentById(collection, id) {
  try {
    const result = await client.query(
      q.Get(
        q.Ref(q.Collection(collection), id)
      )
    );
    console.log('Document retrieved:', result);
    return result;
  } catch (error) {
    console.error('Error retrieving document:', error);
  }
}

async function getAllDocuments(collection) {
    try{
        const result = await client.query(
            q.Map(
            q.Paginate(q.Documents(q.Collection(collection))),
            q.Lambda(x => q.Get(x))
            )
        );
        console.log(`All documents fetched from ${collection} collection.`)
        return result.data;
    } catch(error) {
        console.error('Error fetching documents from ${collection} collection: ', error);
    }
}

async function getUserById(id) {
    try {
      const user = await client.query(q.Get(q.Match(q.Index("getUserById"), id)));
      return user.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  async function createUser(username, email, password) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Now you can store the hashed password in your database

        const newUserID = uuidv4();

        const newUser = await client.query(
          q.Let(
            {
              count: q.Count(q.Documents(q.Collection('Users')))
            },
            q.Create(
              q.Collection('Users'),
              {
                data: {
                  user_id: newUserID,
                  username,
                  email,
                  password: hashedPassword,
                  followedUsers: [],
                  followedBy: [],
                  posts: [],
                }
              }
            )
          )
        );        

        return newUser.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

  async function registerUser(email, password) {
    try {
      const result = await client.query(
        q.Call('getUserByEmail', email)
      );
  
      if (!result) {
        console.log('User not found.');
        throw new Error('Invalid info.');
      }
  
      const user = result.data;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {

        const response = {

        };

        response.status = 201;

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

        response.token = token;

        response.user_id = user.user_id;

        return response;
      } else {
        console.log('Invalid info.');
        throw new Error('Invalid info.');
      }
    } catch (error) {
      console.log('Error at user sign-in: ', error);
      return error instanceof Error ? error.message : 'An unknown error occurred';
    }
  }

  async function updateUser(user_id, target_user_id) {
    try {
      // Use Map to fetch the user document
      const userResult = await client.query(
        q.Map(
            q.Paginate(q.Match(q.Index("getUserById"), user_id)),
            q.Lambda("X", q.Get(q.Var("X")))
        )
      );

      // Use Map to fetch the target user document
      const targetUserResult = await client.query(
          q.Map(
              q.Paginate(q.Match(q.Index("getUserById"), target_user_id)),
              q.Lambda("X", q.Get(q.Var("X")))
          )
      );

        // Extract the user document from the result
        const user = userResult.data[0];

        // Extract the target user document from the result
        const targetUser = targetUserResult.data[0];

        // Update the user document by adding the target user ID to the followedUsers array
        const updatedUser = await client.query(
            q.Update(
                user.ref,
                { data: { ...user.data, followedUsers: q.Append(target_user_id, user.data.followedUsers || []) } }
            )
        );

        // Update the target user document by adding the user ID to the followedBy array
        const updatedTargetUser = await client.query(
            q.Update(
                targetUser.ref,
                { data: { ...targetUser.data, followedBy: q.Append(user_id, targetUser.data.followedBy || []) } }
            )
        );

        return { updatedUser, updatedTargetUser };
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function updateUserInfo(user_id, data)
{
  try {
    const userResult = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("getUserById"), user_id)),
          q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const user = userResult.data[0];

    const newImage = data.image != "" ? data.image : user.data.image;
    const newUsername = data.username != "" ? data.username: user.data.username;
    const newDescription = data.description != "" ? data.description: user.data.description;
    const newLocation = data.location != "" ? data.location: user.data.location;
    const newLanguage = data.language != "" ? data.language: user.data.language;

    const updatedUser = await client.query(
      q.Update(
          user.ref,
          { data: {...data, 
              image: newImage,
              username: newUsername,
              description: newDescription,
              location: newLocation,
              language: newLanguage,
          }}
      )
  );

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

async function updatePostInfo(post_id, data)
{
  try {
    const postResult = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("getPostById"), post_id)),
          q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const post = postResult.data[0];

    const updatedPost = data.likes > post.data.likes ? await client.query(
      q.Update(
          post.ref,
          { data: { ...data, likedBy: q.Append(data.user_id, post.data.likedBy || []) } }
      )
    ) :
    await client.query(
      q.Update(
          post.ref,
          { data: { ...data, likedBy: post.data.likedBy.filter(userId => userId !== data.user_id)} }
      )
    )

    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
  }
}


async function getFollowers(user_id) {
  try {
    const userResult = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("getUserById"), user_id)),
          q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const user = userResult.data[0];

    const followerIds = user.data.followedBy;

    const followers = await client.query(
      q.Map(
        followerIds,
        q.Lambda(
          'user_id',
          q.If(
            q.Exists(q.Match(q.Index('getUserById'), q.Var('user_id'))),
            q.Get(q.Match(q.Index('getUserById'), q.Var('user_id'))),
            []
          )
        )
      )
    );

    const postIds = user.data.posts;

    const posts = await client.query(
      q.Map(
        postIds,
        q.Lambda(
          'post_id',
          q.If(
            q.Exists(q.Match(q.Index('getPostById'), q.Var('post_id'))),
            q.Get(q.Match(q.Index('getPostById'), q.Var('post_id'))),
            []
          )
        )
      )
    );

    if(followers)
    {
      return {
        followers, 
        posts,
      }
    }
    else 
      throw error;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
}

async function getHomeInfo(user_id) {
  try 
  {
    const userResult = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("getUserById"), user_id)),
          q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const user = userResult.data[0];

    const followedUsersIds = user.data.followedUsers;

    const followedUsers = await client.query(
      q.Map(
        followedUsersIds,
        q.Lambda(
          'user_id',
          q.If(
            q.Exists(q.Match(q.Index('getUserById'), q.Var('user_id'))),
            q.Get(q.Match(q.Index('getUserById'), q.Var('user_id'))),
            []
          )
        )
      )
    );

    const users = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("Users"))),
          q.Lambda(x => q.Get(x))
        )
      );

    const posts = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("Posts"))),
          q.Lambda(x => q.Get(x))
        )
      );

    return { 
      followedUsers,
      users,
      posts,
     };
  }
  catch(error) 
  {
    console.log("Back-end (database) error: ", error);
  }
}

async function createPost(user_id, data) {
  try {

      const unique_id = uuidv4();

      const response = await client.query(
        q.Let(
          {
            count: q.Count(q.Documents(q.Collection('Posts')))
          },
          q.Create(
            q.Collection('Posts'),
            {
              data: {
                post_id: unique_id,
                author_id: user_id,
                date: new Date().toISOString(), // Current date in ISO format
                image: data.image,
                title: data.title,
                description: data.description,
                tags: data.tags,
                likes: 0,
                comments: 0,
                shares: 0,
                saves: 0,
                likedBy: [],
              }
            }
          )
        )
      );
      

      const userResult = await client.query(
        q.Map(
            q.Paginate(q.Match(q.Index("getUserById"), user_id)),
            q.Lambda("X", q.Get(q.Var("X")))
        )
      );
  
      const user = userResult.data[0];
  
      const updatedUser = await client.query(
        q.Update(
            user.ref,
            { data: {...user.data, posts: q.Append(response.data.post_id, user.data.posts || [])} }
        )
      );

      return updatedUser;
  } catch (error) {
      console.error('Error creating post:', error);
      throw error;
  }
}

async function deletePost(post_id) {
  try 
  {
    const postResult = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("getPostById"), post_id)),
          q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const post = postResult.data[0];

    const user_id = post.data.author_id;

    const result = await client.query(
      q.Delete(
        post.ref 
      )
    );

    const userResult = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("getUserById"), user_id)),
          q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const user = userResult.data[0];

    const updatedUser = await client.query(
      q.Update(
        user.ref,
        { data: { ...user.data, posts: q.Filter(user.data.posts || [], q.Lambda('post', q.Not(q.Equals(post_id, q.Var('post'))))) } }
      )
    );

    return updatedUser;
  }
  catch(error)
  {
    console.error('Error deleting post:', error);
    throw error;
  }
}



async function createComment(post_id, author_id, content)
{
  try
  {
    const unique_id = uuidv4();

    const userResult = await client.query(
      q.Map(
          q.Paginate(q.Match(q.Index("getUserById"), author_id)),
          q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    const user = userResult.data[0];

    const newComment = await client.query(
        q.Create(
          q.Collection('Comments'),
          {
            data: 
            {
              post_id,
              comment_id: unique_id, 
              author_id,
              author_image: user.data.image,
              author_username: user.data.username,
              content,
              likes: 0,
              date: new Date().toISOString(),
            }
          }
        )
    ); 

    return newComment;
  }
  catch(error)
  {
    console.log("Database error: ", error);
    throw error;
  }
}


async function getComments(post_id)
{
  try 
  {
    const comments = await client.query(q.Map(
      q.Paginate(
        q.Match(
          q.Index("getCommentsByPostId"), 
          post_id 
        )
      ),
      q.Lambda('X', q.Get(q.Var('X')))
    ));

    return comments;
  }
  catch(error)
  {
    console.log("Database error: ", error);
    throw error;
  }
}

async function getArticles()
{
  try 
  {
    const articles = await client.query(
      q.Map(
      q.Paginate(q.Documents(q.Collection("Articles"))),
      q.Lambda(x => q.Get(x))
      )
    );

    return articles;
  }
  catch(error)
  {
    console.log("Database error: ", error);
    throw error;
  }
}

async function getArticleById(article_id)
{
  try 
  {
    const article = await client.query(q.Map(
      q.Paginate(
        q.Match(
          q.Index("getArticleById"), 
          article_id
        )
      ),
      q.Lambda('X', q.Get(q.Var('X')))
    ));

    return article;
  }
  catch(error)
  {
    console.log("Database error: ", error);
    throw error;
  }
}

async function getChatByIds(user1_id, user2_id)
{
  try 
  {
    const chat = await client.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('getChatByIds'),
            user1_id,
            user2_id
          )
        ),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    );
    return chat.data;
  }
  catch(error)
  {
    console.log("Database error: ", error);
    throw error;
  }
}

async function getProblemById(problem_id)
{
  try 
  {
    const problem = await client.query(
      q.Get(
        q.Ref(q.Collection("Problems"), problem_id)
      )
    );

    console.log(problem);
    
    return {};

    return problem;
  }
  catch(error)
  {
    console.log("Database error: ", error);
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
};
