//Import the CSS module file for this specific component
import styles from './SignupStyle.module.css';

import { useState } from 'react';

import axios from 'axios';

const SignUp = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  
  // @ts-ignore: TS6133

  const handleSubmit = async () => {
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
    <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.card}>
                <h1>
                    Sign-up for OneTech
                </h1>
                <h1>
                    Username
                </h1>
                <input 
                  type="text"
                  onChange={(e : any) => setUsername(e.target.value)}
                />
                <h1>
                    Email
                </h1>
                <input 
                  type="text"
                  onChange={(e : any) => setEmail(e.target.value)}
                />
                <h1>
                    Password
                </h1>
                <input 
                  type="password"
                  onChange={(e : any) => setPassword(e.target.value)}
                />
                <h1>
                    Confirm Password
                </h1>
                <input 
                  type="password"
                  onChange={(e : any) => setConfirm(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    Submit
                </button>
                <br/>
            </div>
        </div>
    </div>
  )
}

export default SignUp