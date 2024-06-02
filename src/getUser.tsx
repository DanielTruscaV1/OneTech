import axios from 'axios';

export interface User
{
    id: number;
    username: string;
    email: string;
    image: string;
    description: string;
    location: string;
    language: string;
  }

export const getUserData = async (): Promise<User | null> => {
  const userIDString = localStorage.getItem("userID");
  const userID = userIDString !== null ? parseInt(userIDString, 10) : null;
  
  const userData = localStorage.getItem('user');

  if (userData) {
    try {
      return JSON.parse(userData) as User;
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
    }
  }

  try {
    const response = await axios.get<User>(
      `https://onetech.onrender.com/api/users/${userID}`
      //`http://localhost:3000/api/users/${userID}`
    ); // Replace with your API endpoint
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Failed to fetch user data from API:', error);
    return null;
  }
};