//Import the CSS module file for this specific component
import styles from './SignInStyle.module.css';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <img 
        src="/logo2.png"
        className={styles.logo}
      />
      <h1 className={styles.header}>
        Welcome back to OneTech!
      </h1>
      <p className={styles.sign_up}>
        Sign-In to your account
      </p>
      <p className={styles.label3}>
        Email
      </p>
      <input 
        type="email"
        className={styles.input3}
      />
      <p className={styles.label4}>
        Password
      </p>
      <input 
        type="password"
        className={styles.input4}
      />
      <button>
        Sign-In
      </button>
      <img 
        src="/sign_in1.svg"
        className={styles.side}
      />
    </div>
  )
}

export default SignUp