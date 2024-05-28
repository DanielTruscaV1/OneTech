import styles from "./TopSidebarStyle.module.css"

const TopSidebar = ({ message } : {
    message: string;
}) => {
  return (
    <main className={styles.container}>
        <h1 className={styles.welcome}>
            {
                message && message.startsWith("Welcome") ? 
                <p>
                    Welcome back, <span className="font-black">Ezreal!</span> 
                </p>:
                <p style={{ borderBottom: "2.5px solid #00ADB5" }}>
                    { message }
                </p>
            }
         </h1>
         <input 
            className={styles.input}
            type="text"
         />
        <img 
            className={styles.search}
            src="/top1.png"
            width="35px"
            height="35px"
        />
        <p className={styles.search2}>
            Search
        </p>
        <div className={styles.actions}>
            <img 
                className={styles.image}
                src="/top2.png"
                width="30px"
                height="30px"
            />
            <img 
                className={styles.image}
                src="/top33.png"
                width="30px"
                height="30px"
            />
            <img 
                className={styles.image}
                src="/user11.png"
                style={{
                    position: "absolute",
                    top: "-2vh",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%"
                }}
            />
        </div>
    </main>
  )
}

export default TopSidebar