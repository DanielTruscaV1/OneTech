import styles from "../new_styles/HomeStyle.module.css"

import Sidebar from "./Sidebar"
import Top from "./Top"

const Home = () => {
  return (
    <div className={styles.home}>
        <Sidebar/>
        <Top/>
    </div>
  )
}

export default Home