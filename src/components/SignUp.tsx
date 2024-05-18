//Import the CSS module file for this specific component
import styles from './SignUpStyle.module.css';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <img 
        src="/logo2.png"
        className={styles.logo}
      />
      <h1 className={styles.header}>
        Welcome to OneTech!
      </h1>
      <p className={styles.sign_up}>
        Sign-Up for free
      </p>
      <p className={styles.label1}>
        First Name
      </p>
      <input 
        type="text"
        className={styles.input1}
      />
      <p className={styles.label2}>
        Last Name
      </p>
      <input 
        type="text"
        className={styles.input2}
      />
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
      <p className={styles.label5}>
        Confirm Password
      </p>
      <input 
        type="password"
        className={styles.input5}
      />
      <button>
        Sign-Up
      </button>
      <img 
        src="/sign_up1.svg"
        className={styles.side}
      />
    </div>
  )
}

export default SignUp