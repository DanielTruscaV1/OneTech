//Import the CSS module file for this specific component
import styles from './SignInStyle.module.css';

import { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signin', formData);
      const token = response.data;
      localStorage.setItem('jwtToken', token);
      if(response.status === 201)
        navigate('/user-profile');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <img 
        src="/logo2.png"
        className={styles.logo}
      />
      <h1 className={styles.header}>
        Welcome back to OneTech!
      </h1>
      <p className={styles.sign_up}>
        Sign-In to your account
      </p>
      <p className={styles.label3}>
        Email
      </p>
      <input 
        type="email"
        className={styles.input3}
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <p className={styles.label4}>
        Password
      </p>
      <input 
        type="password"
        className={styles.input4}
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type='submit'>
        Sign-In
      </button>
      <img 
        src="/sign_in1.svg"
        className={styles.side}
      />
    </form>
  )
}

export default SignUp