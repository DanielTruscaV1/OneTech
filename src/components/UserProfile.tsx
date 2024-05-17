//Import the CSS module file for this specific component
import styles from './UserProfileStyle.module.css';

//Import the react components
import TopSidebar from './TopSidebar';
import LeftSidebar from './LeftSidebar';

const UserProfile = () => {
  return (
    <>
        <TopSidebar/>
        <LeftSidebar/>
        <div className={styles.profile_image_container}>

        </div>
    </>
  )
}

export default UserProfile