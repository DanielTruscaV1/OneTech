import styles from "./ProfileStyle.module.css"

import Header from "./Header"

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.body}>
                <h1 className={styles.username}>
                    {user.username}
                </h1>
                <img 
                    src={user.image}
                    className={styles.image}
                />
                <div className={styles.card}>
                    <button>
                        Follow
                    </button>
                    <button>
                        Text
                    </button>
                </div>
                <div className={styles.card}>
                    <p>
                        {user.description}
                    </p>
                </div>
                <div className={styles.card}>
                    <button>
                        Posts
                    </button>
                    <button>
                        Info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile