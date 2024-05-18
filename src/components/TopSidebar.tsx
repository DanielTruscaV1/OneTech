import styles from "./TopSidebarStyle.module.css"

const TopSidebar = () => {
  return (
    <main className={styles.container}>
        <img 
            src="/logo2.png"
            className={styles.logo_image}
        />
        <h1 className={styles.logo}>
            OneTech
        </h1>
        <img 
            src="/top_sidebar_1.png"
            className={styles.search_image}
        />
        <p className={styles.search_note}>
            Ctrl + K
        </p>
        <input 
            type="text"
            className={styles.search}
            placeholder="Search OneTech..."
        />
        <div className={styles.support_container}>
            <img 
                src="/top_sidebar_2.png"
                className={styles.support_image}
            />
            <p className={styles.support}>
                Support
            </p>
        </div>
    </main>
  )
}

export default TopSidebar