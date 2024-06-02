//Import the CSS module file for this specific component
import { useState, FormEvent } from 'react';
import styles from './SignInStyle.module.css';

import { useNavigate } from "react-router-dom"
import { useAuth } from '../auth';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
   
    try{
      const response = await axios.post(
        "https://onetech.onrender.com/api/signin",
        //"http://localhost:3000/api/signin",
        {
          email,
          password,
        },
        {
          headers: {
            'api-key': '',
            // Add other headers if needed
          }
        }
      );

      console.log(response);
  
      if(response.status === 201)
      {
          const token = response.data.result.token;
          login(token);
          navigate('/profile');
      }
    }
    catch(error)
    {
      console.log(error);
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
        <img 
          src="/auth3.png"
          className={styles.background3}
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