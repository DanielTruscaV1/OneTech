import styles from "../V3Styles/Profile.module.css"

import Sidebar from "./Sidebar"
import Logo from "./Logo"
import UserImage from "./UserImage"

const Profile = () => {

  return (
    <div className={styles.profile}>
        <Sidebar/>
        <Logo/>
        <UserImage/>
    </div>
  )
}

export default Profile