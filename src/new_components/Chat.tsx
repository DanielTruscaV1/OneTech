import styles from "./ChatStyle.module.css";

import { User } from '../getUser.tsx';

import axios from "axios";
import { useEffect, useState } from "react";

const Chat = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    const [followers, setFollowers] = useState<any>([]);

    const user_id = localStorage.getItem("userID") as string;

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userData = await axios.get(
              `https://onetech.onrender.com/api/users/${user_id}`
            ) as any;
  
            if (userData) {
              await fetchData(userData); // Call fetchData after setUser
            } else {
              setError('Failed to fetch user data');
            }
            setLoading(false);
          };
        
          const fetchData = async (userData : User) => { // Accept userData as parameter
            if(userData) {
              const result = await axios.get(
                `https://onetech.onrender.com/api/followers/${user_id}`,
                //`http://localhost:3000/api/followers/${userData.user_id}`
              );
              setFollowers(result.data.followers);
            }
          };
        
          fetchUserInfo();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
        Chat
        <div className={styles.followers}>
            <hr/>
            <h2>
                Followers
            </h2>
            {
                followers.map((follower: any) => {
                    return <div 
                        className={styles.follower}
                    >
                        <img src={follower.data.image}/>
                        <h1>
                            {follower.data.username}
                        </h1>
                    </div>
                })
            }
        </div>
        <div className={styles.messages}>
            <h1>
                Your chat with InertGlobe
            </h1>
            <hr/>
            
            <p style={{fontSize: "12px", marginLeft: "88%"}}>
                12:11
            </p>
            <div className={styles.user_message}>   
                <p>
                    Hello! How are you?
                </p>
            </div>
            <br/>

            <p style={{fontSize: "12px", marginLeft: "6%"}}>
                12:11
            </p>
            <div className={styles.friend_message}>
                <p>
                    Hi! I'm doing well, you?
                </p>
            </div>
            
            <br/>
            <p style={{fontSize: "12px", marginLeft: "88%"}}>
                12:11
            </p>
            <div className={styles.user_message}>   
                <p>
                    Hello! How are you?
                </p>
            </div>
            <br/>
            
            <p style={{fontSize: "12px", marginLeft: "6%"}}>
                12:11
            </p>
            <div className={styles.friend_message}>
                <p>
                    Hi! I'm doing well, you?
                </p>
            </div>
        </div>
    </div>
  )
}

export default Chat