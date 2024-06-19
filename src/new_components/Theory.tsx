import styles from "../new_styles/TheoryStyle.module.css"
import Sidebar from "./Sidebar"
import Top from "./Top"

import { getUserData, User } from '../getUser.tsx';
import { useEffect, useState } from "react";

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
          <input 
            type="text"
            placeholder="Search for an article.........."
          />

          <div className={styles.article}>
            <img src="theory1.png"/>
            <div className={styles.article_info}>
              <h1>
                Data Structures and Algorithms introduction
              </h1>
              <p>
                | 0 views | 0 upvotes | 5 minutes read |
              </p>
            </div>
          </div>
          
          <div className={styles.article}>
            <img src="theory2.png"/>
            <div className={styles.article_info}>
              <h1>
                Developing Software in React
              </h1>
              <p>
                | 0 views | 0 upvotes | 5 minutes read |
              </p>
            </div>
          </div>

          <div className={styles.article}>
            <img src="theory3.png"/>
            <div className={styles.article_info}>
              <h1>
                Competitive Programming introduction
              </h1>
              <p>
                | 0 views | 0 upvotes | 5 minutes read |
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Theory