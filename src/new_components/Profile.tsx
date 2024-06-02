import { useState, useEffect } from "react"
import styles from "../new_styles/ProfileStyle.module.css"
import EditProfile from "./EditProfile"
import Sidebar from "./Sidebar"
import Top from "./Top"

import { getUserData, User } from '../getUser.tsx';

const Profile = () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await getUserData();
    
          if (userData) {
            setUser(userData);
          } else {
            setError('Failed to fetch user data');
          }
          setLoading(false);
        };
    
        fetchUserInfo();
      }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.profile}>
        <Sidebar/>
        <Top user={user}/>
        <EditProfile/>
        { user &&
        <>
        <img 
            src={user.image}
            className={styles.image}
        />
        <div className={styles.info}>
            <h1 className="text-2xl mb-4">
                { user.username }
            </h1>
            <h1 className="text-orange-400 font-semibold">
                <img className="inline-block w-5 mr-3" src="/crown1.png"/>
                Premium Member
            </h1>
            <div className="w-full">
                <h1 className={styles.status1}>&#9679;</h1>
                <h1 className={styles.status2}>
                    Online
                </h1>
            </div>
        </div>
        <div className={styles.info2}>
            <hr/>
            <p>
                { user.description }
            </p>
            <div>
                <button>
                    <img src="/follow1.png"/>
                    Follow
                </button>
                <button>
                    <img src="/chat1.png"/>
                    Chat
                </button>
            </div>
            <h2>
                <img src="/location1.png"/>
                Location: {user.location}
            </h2>
            <h2>
                <img src="/language1.png"/>
                Language: {user.language}
            </h2>
            <h2>
                <img src="/sign1.png"/>
                Joined: 26/05/2024
            </h2>
        </div>
        </>
        }
    </div>
  )
}

export default Profile