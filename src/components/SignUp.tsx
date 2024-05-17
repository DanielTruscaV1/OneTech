//Import the CSS module file for this specific component
import styles from './SignUpStyle.module.css';

const SignUp = () => {
  return (
    <>
      <div className={styles.container1}>
        <h1 className={styles.title1}>
          OneTech
        </h1>
        <h1 className={styles.slogan}>
          Start your journey today!
        </h1>
        <img 
          src='/SignUp3.png'
          className=''
        />
      </div>
      <div className={styles.container2}>
        <h1 className={styles.title2}>
          Welcome!
        </h1>
        <p className={styles.note2}>
          Sign-Up for OneTech
        </p>
        <p className={styles.label}>
          Email:
        </p>
        <input 
          type="email"
          className={styles.input}
        />
        <p className={styles.label}>
          Password:
        </p>
        <input 
          type="password"
          className={styles.input}
        />
        <br/>
        <input 
          type="checkbox"
          className={styles.checkbox}
        />
        <p className={styles.checkbox_label}>
          Remember Me
        </p>
        <button className={styles.submit}>
          Sign-Up
        </button>
        <br/>
        <br/>
      </div>
    </>
  )
}

export default SignUp