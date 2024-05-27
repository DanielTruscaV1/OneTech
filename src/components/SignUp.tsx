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
  
  // @ts-ignore: TS6133
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
        src="/auth1.png"
        className={styles.background}
      />
      <div className={styles.card}>
        <h1 className="mt-4 text-3xl text-center font-semibold">
          Welcome to <span style={{ color: "#00ADB5"}}>OneTech!</span>
        </h1>
        <p className="my-2 text-l text-center text-gray-400">
          Log-In to your account 
        </p>
        <input 
          type="text"
          className={styles.input}
          placeholder="Username..."
        />
        <input 
          type="email"
          className={styles.input}
          placeholder="Email..."
        />
        <input 
          type="password"
          className={styles.input}
          placeholder="Password..."
        />
        <input 
          type="password"
          className={styles.input}
          placeholder="Confirm Password..."
        />
        <button>
          Submit
        </button>
        <p className="mt-2 text-l text-center text-gray-400">
          Already have an account?
        </p>
        <p 
          className="mt-2 text-l text-center"
          style={{ color: "#00ADB5"}}
        >
          Log-In
        </p>
      </div>
    </form>
  )
}

export default SignUp