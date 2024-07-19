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
      <div className={styles.card2}>
        <h1 className="mt-4 text-4xl text-center font-semibold">
          Sign-up on One<span style={{ color: "#00ADB5"}}>Tech</span> for free
        </h1>
        <p>
          Username
        </p>
        <input 
          type="text"
          className={styles.input}
          placeholder="Username..."
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>
          Email
        </p>
        <input 
          type="email"
          className={styles.input}
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>
          Password
        </p>
        <input 
          type="password"
          className={styles.input}
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Confirm Password
        </p>
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
        <br/>
        <p className={styles.special}>
          Already have an account?
        </p>
        <p 
          className={styles.special}
          style={{ color: "#00ADB5", marginLeft: "20px"}}
          onClick={() => navigate('/sign-in')}

        >
          Sign-in
        </p>
      </div>
    </form>
  )
}

export default SignUp