//Import the CSS module file for this specific component
import styles from './SignUpStyle.module.css';

import { useState, FormEvent } from 'react';

import axios from 'axios';

const SignUp = () => {
  
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
        <h1 className="mt-4 text-2xl text-center font-semibold">
          Sign-up for One<span style={{ color: "#0047FF"}}>Tech</span>
        </h1>
        <br/>
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
          Confirm
        </p>
        <input 
          type="password"
          className={`${styles.input} ${shouldBeColored && "bg-pan-left2"}`}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        
        <div className={styles.terms}>
          <button>

          </button>
          <p>
            I agree to the terms and conditions of One<span style={{ color: "#0047FF"}}>Tech</span>
          </p>
        </div>
        <button 
          disabled={!button}
          className={`${!button && "disabled"} ${shouldBeColored && "bg-pan-left2"}`}
          onClick={() => {setShouldBeColored(false); setShouldBeFullyColored(false);}}
        >
          Submit
        </button>
        <br/>
      </div>
    </form>
  )
}

export default SignUp