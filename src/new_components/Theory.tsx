import styles from "../new_styles/TheoryStyle.module.css"
import Sidebar from "./Sidebar"
import Top from "./Top"

import { getUserData, User } from '../getUser.tsx';
import { useEffect, useState } from "react";
import Subject from "../small_components/Subject.tsx";

const Theory = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    const user_id = localStorage.getItem("userID");

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await getUserData(user_id);
    
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
    <div className={styles.theory}>
        <Sidebar/>
        <Top user={user}/>
        <div className={styles.content}>
            <h1>
                Data Structures and Algorithms (DSA)
            </h1>
            <Subject/>
            <h1>
                React.js fundamentals
            </h1>
            <Subject/>
            <h1>
                Vue.js fundamentals
            </h1>
            <Subject/>
        </div>
    </div>
  )
}

export default Theory