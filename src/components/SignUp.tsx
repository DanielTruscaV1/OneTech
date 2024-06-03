//Import the CSS module file for this specific component
import styles from './SignUpStyle.module.css';

import { useState, FormEvent } from 'react';

import axios from 'axios';

import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [button, setButton] = useState(true);
  
  // @ts-ignore: TS6133

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setButton(false);

    try {
      const response = await axios.post(
        "https://onetech.onrender.com/api/signup",
        //'http://localhost:3000/api/signup',
        {
        username,
        email,
        password,
        confirm,
      });
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
      <img 
          src="/auth3.png"
          className={styles.background3}
        />
      <div className={styles.card2}>
        <h1 className="mt-4 text-3xl text-center font-semibold">
          Welcome to <span style={{ color: "#00ADB5"}}>OneTech!</span>
        </h1>
        <p className="my-2 text-l text-center text-gray-400">
          Sign-Up for free 
        </p>
        <input 
          type="text"
          className={styles.input}
          placeholder="Username..."
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="email"
          className={styles.input}
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          className={styles.input}
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="password"
          className={styles.input}
          placeholder="Confirm Password..."
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button className={`${!button && "disabled"}`} disabled={!button}>
          Submit
        </button>
        <p className="mt-2 text-l text-center text-gray-400">
          Already have an account?
        </p>
        <p 
          className="mt-2 text-l text-center cursor-pointer"
          style={{ color: "#00ADB5"}}
          onClick={() => navigate('/sign-in')}

        >
          Log-In
        </p>
      </div>
    </form>
  )
}

export default SignUp