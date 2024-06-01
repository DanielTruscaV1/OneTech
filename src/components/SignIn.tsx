//Import the CSS module file for this specific component
import { useState, FormEvent } from 'react';
import styles from './SignUpStyle.module.css';

import { useNavigate } from "react-router-dom"
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
   
    try{
      const response = await axios.post(
        "http://localhost:3000/api/signin",
        {
          email,
          password,
        }
      );
  
      console.log(response.status);
  
      if(response.status === 201)
      {
          navigate('/profile');
      }
    }
    catch(error)
    {
      alert("Sign-in failed.");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <>
      <form 
        className={styles.container}
        onSubmit={(event) => handleSubmit(event)}
      >
        <img 
          src="/auth1.png"
          className={styles.background}
        />
        <div className={styles.card2}>
          <h1 className="mt-4 text-3xl text-center font-semibold">
            Welcome to <span style={{ color: "#00ADB5"}}>OneTech!</span>
          </h1>
          <p className="my-2 text-l text-center text-gray-400">
            Log-In to your account 
          </p>
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
          <button>
            Submit
          </button>
          <p className="mt-2 text-l text-center text-gray-400">
            Don't have an account?
          </p>
          <p 
            className="mt-2 text-l text-center cursor-pointer"
            style={{ color: "#00ADB5"}}
            onClick={() => navigate('/sign-up')}
          >
            Sign-Up
          </p>
        </div>
      </form>
    </>
  )
}

export default SignUp