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
          <h1 className={styles.profile_title}>
            Profile - User Name
          </h1>
          <p className={styles.profile_info}>
            Email - useremail@gmail.com
          </p>
          <p className={styles.profile_info}>
            Location - User Location
          </p>
          <div className={styles.profile_image}>
            UN
          </div>
          <nav>
            <button>
              <img src='/profile2.png'/>
                Activity
              </button>
              <button>
                <img src='/profile3.png'/>
                Achivements
              </button>
            <button>
              <img src='/profile1.png'/>
              Friends
            </button>
          </nav>
        </div>
    </>
  )
}

export default UserProfile