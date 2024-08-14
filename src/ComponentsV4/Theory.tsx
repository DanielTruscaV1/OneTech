import { useNavigate } from "react-router-dom"
import Header from "./Header"
import styles from "./TheoryStyle.module.css"


const Theory = () => {

  //@ts-ignore
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.body}>
        <div className={styles.grid_container}>
        <div className={styles.grid_item}>
          <img src="/theory_tn1.png"/>
        </div>
        <div className={styles.grid_item}>
          <img src="/theory_tn2.png"/>
        </div>
        <div className={styles.grid_item}>
          <img src="/theory_tn3.png"/>
        </div>
        <div className={styles.grid_item}>
          <img src="/theory_tn4.png"/>
        </div>
        </div>
        <br/>
      </div>
    </div>
  )
}

export default Theory