import styles from "./FriendsStyle.module.css"

const Friends = () => {
  return (
    <div className={styles.container}>
        <h1 className="inline-block w-1/2 mt-2 text-xl text-center">
          <img className="inline-block mr-4" width="20px" height="20px" src="/friends1.png"/>
        <span className="realtive" >
            Online
        </span>
        </h1>
        <h1 className="inline-block w-1/2 mt-2 text-xl text-center">
        <img className="inline-block mr-4" width="20px" height="20px" src="/friends2.png"/>
        <span className="realtive">
            Offline
        </span>
        </h1>
    </div>
  )
}

export default Friends