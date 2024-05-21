//Import the CSS module file for this specific component
import styles from './UserProfileStyle.module.css';

//Import the react components
import TopSidebar from './TopSidebar';
import LeftSidebar from './LeftSidebar';
import Footer from './Footer';
import Activity from './Activity';
import Friends from './Friends';
import { useEffect, useState } from 'react';

import axios from "axios"

interface Document {
  data: {
    email: string;
  }
}

const UserProfile = () => {
  const [selectedView, setSelectedView] = useState(0);
  const [user, setUser] = useState<{ 
    firstName: string;
    lastName: string;
    email: string;
    location: string;
  } | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/398256123387314379');
        setUser(response.data);

        const sessions = await axios.get('http://localhost:3000/api/sessions');

        const goodSession = sessions.data.filter((s : Document) => user && s.data.email === user.email)
        goodSession;
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, []); 

  return (
    <>
        <TopSidebar/>
        <LeftSidebar/>
        <div className={styles.profile_image_container}>
          <h1 className={styles.profile_title}>
            Profile - {user && user.firstName + " " + user.lastName}
          </h1>
          <p className={styles.profile_info}>
            Email - {user && user.email}
          </p>
          <p className={styles.profile_info}>
            Location - {user && user.location}
          </p>
          <div className={styles.profile_image}>
            {user && user.firstName[0]+user.firstName[1]}
          </div>
          <nav>
            <button onClick={() => {setSelectedView(0)}}>
              <img src='/profile2.png'/>
                Activity
            </button>
            <button onClick={() => {setSelectedView(1)}}>
              <img src='/profile3.png'/>
              Achivements
            </button>
            <button onClick={() => {setSelectedView(2)}}>
              <img src='/profile1.png'/>
              Friends
            </button>
            <button onClick={() => {setSelectedView(3)}}>
              <img src='/profile5.png'/>
              Teams
            </button>
          </nav>
          <div className={styles.actions}>
            <button className={styles.edit}>
              <svg width="25px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.096"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              Edit Profile
            </button>
          </div>    
        </div>
        {
          selectedView === 0 && <Activity/>
        }
        {
          selectedView === 2 && <Friends/>
        }
        
        <Footer/>
    </>
  )
}

export default UserProfile