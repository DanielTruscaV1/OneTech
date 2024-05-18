//Import the CSS module file for this specific component
import styles from './SignUpStyle.module.css';

import { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';

const SignUp = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      const response = await axios.post('http://localhost:3000/api/signup', formData);
      console.log(response.data);
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
        Welcome to OneTech!
      </h1>
      <p className={styles.sign_up}>
        Sign-Up for free
      </p>
      <p className={styles.label1}>
        First Name
      </p>
      <input 
        type="text"
        className={styles.input1}
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <p className={styles.label2}>
        Last Name
      </p>
      <input 
        type="text"
        className={styles.input2}
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
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
      <p className={styles.label5}>
        Confirm Password
      </p>
      <input 
        type="password"
        className={styles.input5}
      />
      <button type="submit">
        Sign-Up
      </button>
      <img 
        src="/sign_up1.svg"
        className={styles.side}
      />
    </form>
  )
}

export default SignUp