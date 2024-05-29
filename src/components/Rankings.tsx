import LeftSidebar from "./LeftSidebar"

import styles from "./RankingsStyle.module.css"
import TopSidebar from "./TopSidebar"

const Rankings = () => {
  return (
    <div className={styles.container}>
        <LeftSidebar/>
        <TopSidebar message="Rankings"/>
        <div className={`${styles.team} ${styles.golden}`}>

        </div>
        <div className={`${styles.team} ${styles.silver}`}>

        </div>
        <div className={`${styles.team} ${styles.bronze}`}>

        </div>
        <div className={styles.filter}>
            <button>
                Contest &#x25BC;
            </button>   
            <button>
                Order &#x25BC;
            </button> 
            <input 
                type="text"
            /> 
            <p className="absolute right-20 top-4 text-2xl">
                <img 
                    src="/top1.png"
                    width="25px"
                    className="inline-block ml-2 mr-4"
                />
                Search
            </p> 
        </div>
        
    </div>
  )
}

export default Rankings