import styles from "./ChatStyle.module.css";

import { User } from '../getUser.tsx';

import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';
import Sidebar from "./Sidebar.tsx";

const Chat = () => {

    const { follower_id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    const [followers, setFollowers] = useState<any>([]);

    const user_id = localStorage.getItem("userID") as string;

    const [follower, setFollower] = useState<any>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userData = await axios.get(
              `https://onetech.onrender.com/api/users/${user_id}`
            ) as any;
  
            if (userData) {
              await fetchData(userData); // Call fetchData after setUser
              await fetchFollowerInfo();
            } else {
              setError('Failed to fetch user data');
            }
            setLoading(false);
          };

          const fetchFollowerInfo = async () => {
            const userData = await axios.get(
              `https://onetech.onrender.com/api/users/${follower_id}`
            ) as any;
  
            if (userData) {
              setFollower(userData.data);
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

    const fetchChat = (user_id : any, follower_id: any) => {
        console.log(user_id);
        console.log(follower_id);   
    }

  return (
    <div className={styles.container}>
        <Sidebar/>  
        <br/>
        <div className={styles.followers}>
            <hr/>
            <h2>
                Followers
            </h2>
            {
                followers.map((follower: any) => {
                    return <div 
                        className={styles.follower}
                        onClick={() => fetchChat(user_id, follower.data.user_id)}
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
            <h1 style={{display: "inline-block"}}>
                Your chat with {follower && follower.username}
            </h1>
            <img src="/call3.png" style={{display: "inline-block", marginLeft: "12vw", border: "2px solid black"}}/>
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

            <img src={follower.image}/>
            <p style={{fontSize: "12px", marginLeft: "1.5%"}}>
                12:11
            </p>
            <br/>
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
            
            <img src={follower.image}/>
            <p style={{fontSize: "12px", marginLeft: "1.5%"}}>
                12:11
            </p>
            <br/>
            <div className={styles.friend_message}>
                <p>
                    Hi! I'm doing well, you?
                </p>
            </div>

            <div className={styles.inputs}>
                <img src="/inputs2.png"/>
                <img src="/inputs3.png"/>
                <img src="/inputs4.png"/>
                <input type="text"/>
            </div>
        </div>
        <div className={styles.aside}>
            <p>
                Search in coversation
            </p>
            <div className={styles.aside_flex1}>
                <input type="text"/>
                <button>
                    <img src="/search2.png"/>
                </button>
            </div>
            <h1>
                Call History
            </h1>
            <div className={styles.good_call}>
                <img src="/call1.png"/>
                <p>
                    3 hours ago
                </p>
            </div>
            <div className={styles.bad_call}>
                <img src="/call2.png"/>
                 <p>
                    3 hours ago
                </p>
            </div>
        </div>
    </div>
  )
}

export default Chat