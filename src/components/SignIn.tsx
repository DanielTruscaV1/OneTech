//Import the CSS module file for this specific component
import styles from './SignUpStyle.module.css';

import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <form className={styles.container}>
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
        />
        <input 
          type="password"
          className={styles.input}
          placeholder="Password..."
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
  )
}

export default SignUp