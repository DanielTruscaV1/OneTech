import styles from "../new_styles/TopStyle.module.css"


const Top = () => {
  return (
    <div className={styles.top}>
        <h1>
            Welcome back, <span>Ezreal!</span>
        </h1>
        <img src="/user11.png"/>
        <div className={styles.search}>
            <input 
                type="text"
            />
            <img src="/top1.png"/>
            <p>
                Search
            </p>
        </div>
    </div>
  )
}

export default Top