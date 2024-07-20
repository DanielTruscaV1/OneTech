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

  const [shouldBeColored, setShouldBeColored] = useState(false); 
  const [shouldBeFullyColored, setShouldBeFullyColored] = useState(false); 

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={`${styles.card2} ${shouldBeFullyColored && "bg-pan-left1"}`}>
        <h1 className="mt-4 text-4xl text-center font-semibold">
          Sign-up on One<span style={{ color: "#00ADB5"}}>Tech</span> for free
        </h1>
        <p>
          Username
        </p>
        <input 
          type="text"
          className={`${styles.input} ${shouldBeColored && "bg-pan-left2"}`}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>
          Email
        </p>
        <input 
          type="email"
          className={`${styles.input} ${shouldBeColored && "bg-pan-left2"}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>
          Password
        </p>
        <input 
          type="password"
          className={`${styles.input} ${shouldBeColored && "bg-pan-left2"}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Confirm Password
        </p>
        <input 
          type="password"
          className={`${styles.input} ${shouldBeColored && "bg-pan-left2"}`}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button 
          disabled={!button}
          className={`${!button && "disabled"} ${shouldBeColored && "bg-pan-left2"}`}
          onClick={() => {setShouldBeColored(true); setShouldBeFullyColored(true);}}
        >
          Submit
        </button>
        <br/>
        <p 
          className={styles.special}
          style={{ color: shouldBeColored? "black" : "rgb(180, 180, 180)"}}
        >
          Already have an account?
        </p>
        <p 
          className={styles.special}
          style={{ color: "#00ADB5", marginLeft: "20px"}}
          onClick={() => navigate('/sign-in')}

        >
          Sign-in
        </p>
        {
          shouldBeFullyColored && 
          <div className={`${styles.loader} ${"loader"}`}></div>
        } 
      </div>
    </form>
  )
}

export default SignUp