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
      const user = await client.query(q.Get(q.Ref(q.Collection("Users"), id)));
      return user.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  async function createUser(firstName, lastName, email, password) {
    try {
      const newUser = await client.query(
        q.Create(
          q.Collection('Users'),
          { data: { firstName, lastName, email, password } }
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

module.exports = {
  createDocument,
  getDocumentById,
  getAllDocuments,
  getUserById,
  createUser,
  registerUser,
};
