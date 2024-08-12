import styles from "./BotStyle.module.css"

const Bot = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
           {
                localStorage.getItem("theme") == "light" ?
                <img src="/bot_white.png"/>
                :<img src="/bot_black.png"/>
           }
        </div>
    </div>
  )
}

export default Bot