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

  const [button, setButton] = useState(true);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setButton(false);

    if(email != "" && password != "")
    {
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

        if(response.status === 201)
        {
            const token = response.data.result.token;
            login(token);
            
            localStorage.setItem("userID", response.data.result.user_id)

            navigate(`/profile/${response.data.result.user_id}`);
        }
      }
      catch(error)
      {
        console.log(error);
        alert("Sign-in failed.");
        setEmail("");
        setPassword("");
        setButton(true);
      }
    }
  }

  const [shouldBeColored, setShouldBeColored] = useState(false); 
  const [shouldBeFullyColored, setShouldBeFullyColored] = useState(false); 

  return (
    <>
      <form 
        className={styles.container}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div 
          className={`${styles.card2} ${shouldBeFullyColored && "bg-pan-left1"}`}
        >
          <h1 className="mt-4 text-3xl text-center font-semibold">
            Welcome to One<span style={{ color: "#00ADB5"}}>Tech</span>
          </h1>
          <p>
            Email
          </p>
          <input 
            type="email"
            className={`${styles.input} ${shouldBeColored && "bg-pan-left2"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{backgroundColor: !shouldBeColored ? "rgb(245, 245, 245)" : "rgba(150,255,230,1)"}}
          />
          <p>
            Password
          </p>
          <input 
            type="password"
            className={`${styles.input} ${shouldBeColored && "bg-pan-left2"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{backgroundColor: !shouldBeColored ? "rgb(245, 245, 245)" : "rgba(150,255,230,1)"}}
          />
          <button 
            type="submit" 
            className={`${!button && "disabled"} ${shouldBeColored && "bg-pan-left2"}`} disabled={!button}
            onClick={() => {setShouldBeColored(true); setShouldBeFullyColored(true);}}
          >
            Submit
          </button>
          <br/>
          <p 
            className={styles.special}
            style={{ color: shouldBeColored? "black" : "rgb(180, 180, 180)"}}
          >
            Don't have an account?
          </p>
          <p 
            className={styles.special}
            style={{ color: "#00ADB5", marginLeft: "20px"}}
            onClick={() => navigate('/sign-up')}
          >
            Sign-up
          </p>
          {
            shouldBeFullyColored && 
            <div className={`${styles.loader} ${"loader"}`}></div>
          } 
        </div>
      </form>
    </>
  )
}

export default SignUp