// database.js
require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const newUser = await client.query(
            q.Create(
                q.Collection('Users'),
                { data: { 
                  username, 
                  email, 
                  password: hashedPassword,
                  followedUsers: [],
                  followedBy: [],
                  posts: [],
                } 
              }
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

        const response = await client.query(q.Create(
          q.Collection('Sessions'),
          { data: { email } }
        ));

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

    const updatedUser = await client.query(
      q.Update(
          user.ref,
          { data }
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

    const updatedPost = await client.query(
      q.Update(
          post.ref,
          { data: { ...data, likedBy: q.Append(data.user_id, post.data.likedBy || []) } }
      )
  );

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

    return { followedUsers };
  }
  catch(error) 
  {
    console.log("Back-end (database) error: ", error);
  }
}

async function createPost(user_id, data) {
  try {
      const response = await client.query(
          q.Create(
              q.Collection('Posts'),
              { data: { 
                post_id: data.post_id,
                author_id: user_id,
                image: data.image,
                title: data.title,
                description: data.description,
                tags: data.tags,
                likes: 0,
                comments: 0,
                shares: 0,
                saves: 0,
              } 
            }
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
            { data: {...user.data, posts: q.Append(data.post_id, user.data.posts || [])} }
        )
      );

      return updatedUser;
  } catch (error) {
      console.error('Error creating post:', error);
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
};
