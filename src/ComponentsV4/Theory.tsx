import Header from "./Header"
import styles from "./TheoryStyle.module.css"


const Theory = () => {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.body}>
        <div className={styles.grid_container}>
        <div className={styles.grid_item}>
          <img src="/theory_content1.png" alt="Sorting Algorithms" />
          Sorting Algorithms
        </div>

        <div className={styles.grid_item}>
          <img src="/theory_content2.png" alt="Searching Algorithms" />
          Searching Algorithms
        </div>

        <div className={styles.grid_item}>
          <img src="/theory_content3.png" alt="Graph Algorithms" />
          Graph Algorithms
        </div>

        <div className={styles.grid_item}>
          <img src="/theory_content4.png" alt="Dynamic Programming" />
          Dynamic Programming
        </div>

        <div className={styles.grid_item}>
          <img src="/theory_content5.png" alt="Greedy Algorithms" />
          Greedy Algorithms
        </div>

        <div className={styles.grid_item}>
          <img src="/theory_content6.png" alt="Divide and Conquer" />
          Divide and Conquer
        </div>

        <div className={styles.grid_item}>
          <img src="/theory_content7.png" alt="Backtracking" />
          Backtracking
        </div>
  
        </div>
      </div>
    </div>
  )
}

export default Theory