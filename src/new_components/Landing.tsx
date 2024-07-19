import styles from "./LandingStyle.module.css";

import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <div className={styles.square1}>
        
        </div>
        <div className={styles.square2}>
        
        </div>
        <div className={styles.square3}>
          
        </div>

        <div className={styles.square4}>
        
        </div>
        <div className={styles.square5}>
        
        </div>
        <div className={styles.square6}>
          
        </div>

        <h1 className={styles.title}>
            One 
            <span style={{
                color:"#3ECFC9",
                fontWeight: "500",
            }}>
            Tech</span>
        </h1>
        <br/>
        <p>
            The number one online educational platform for computer science and artificial inteligence.
        </p>
        <div className={styles.button_container}>
            <button onClick={() => navigate('/sign-up')}>
                Sign-up for free
            </button>
            <p>
                or
            </p>
            <button onClick={() => navigate('/sign-in')}>
                Sign-in to your account
            </button>
        </div>
        <img 
            src="/new_landing1.png"
            className={styles.image1}
        />
        <img 
            src="/new_landing2.png"
            className={styles.image2}
        />
    </div>
  )
}

export default Landing