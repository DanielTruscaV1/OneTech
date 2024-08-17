import styles from "./ProfileStyle.module.css"

import Header from "./Header"

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();

    const { global_user_id } = useParams();

    const [userInfo, setUserInfo] = useState<any>(null);

    const [tab, setTab] = useState<number>(0);
    const isLargeDevice = window.matchMedia("(min-width: 600px)").matches;

    const [followers, setFollowers] = useState<any>([]);
    const [posts, setPosts] = useState<any>([]);

    const [submissionsList, setSubmissionsList] = useState<any>(null);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userData = await axios.get(
              `https://onetech.onrender.com/api/users/${global_user_id}`
              //`http://localhost:3000/api/users/${global_user_id}`
            ) as any;
  
            if (userData) {
              setUserInfo(userData.data);
              if(global_user_id == localStorage.getItem("userID")) 
              {
                localStorage.setItem("user", JSON.stringify(userData.data));
              }
              localStorage.setItem("user_id", JSON.stringify(userData.data.user_id));
              await fetchData(); // Call fetchData after setUser
              await getSubmissions();
              setLoading(false);
            } 
          };
          
        const fetchData = async () => {
            const result = await axios.get(
              `https://onetech.onrender.com/api/followers/${global_user_id}`,
              //`http://localhost:3000/api/followers/${userData.user_id}`
            );
            setFollowers(result.data.followers);
            setPosts(result.data.posts);
        };

        const getSubmissions = async () => {
            const response = await axios.get("https://onetech.onrender.com/api/submissions");
            console.log(response.data);
            setSubmissionsList(response.data);
        }
      
        fetchUserInfo();
      }, []);

      const sanitizeUserId = (id : string) => {
        if (typeof id !== 'string') {
          throw new Error('User ID must be a string');
        }
        
        // Remove backslashes and quotes
        const sanitizedId = id.replace(/\\/g, '').replace(/"/g, '');
      
        // Ensure that sanitizedId is not empty
        if (!sanitizedId) {
          throw new Error('Sanitized user ID cannot be empty');
        }
        
        return sanitizedId;
      };

      const theme = localStorage.getItem("theme");

      if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.body}>
                <div className={styles.big_card}>
                    <h1 className={styles.username}>
                        {userInfo.username}
                    </h1>
                    <img 
                        src={userInfo.image}
                        className={styles.image}
                    />
                </div>

                {
                    !isLargeDevice &&
                <div className={styles.tabs_container}>
                    <button 
                        className={styles.tab} 
                        style={{
                            backgroundColor: tab == 0 ? "var(--color1)" : "var(--color3)",
                            color: tab == 0 ? "var(--color5)" : "var(--color4)",
                        }}
                        onClick={() => setTab(0)}
                    >
                        Info
                    </button>
                    <button 
                        className={styles.tab}
                        style={{
                            backgroundColor: tab == 1 ? "var(--color1)" : "var(--color3)",
                            color: tab == 1 ? "var(--color5)" : "var(--color4)",
                        }}
                        onClick={() => setTab(1)}
                    >
                        Posts
                    </button>
                    <button 
                        className={styles.tab}
                        style={{
                            backgroundColor: tab == 2 ? "var(--color1)" : "var(--color3)",
                            color: tab == 2 ? "var(--color5)" : "var(--color4)",
                        }}
                        onClick={() => setTab(2)}
                    >
                        Progress
                    </button>
                </div>
                }

                {
                    (tab == 0 || isLargeDevice) &&
                    <div className={styles.about}>
                        <div className={styles.card} style={{overflowY: "hidden"}}>
                            <h1>
                                About
                            </h1>
                            {userInfo.description}
                        </div>
                        <div className={styles.card}>
                            <h1>
                                Location & Contact
                            </h1>
                            {userInfo.location}
                            <br/>
                            {userInfo.email}
                        </div>
                        <div className={`${styles.card} ${styles.followers}`}>
                            <h1>
                                {followers.length} Followers
                            </h1>
                            <button>
                                Follow
                            </button>
                            <div style={{marginTop: "-5vh"}}>
                                {
                                    followers.map((follower : any) => {
                                        return <div className={styles.box} onClick={() => navigate(`/profile/${follower.data.user_id}`)}>
                                            <img src={follower.data.image}/>
                                            <h2>
                                                {follower.data.username}
                                            </h2>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }

                {
                    (tab == 1) && 
                    <div className={styles.posts}>
                        {
                            posts.map((post : any) => {
                                return <div className={styles.card}>
                                    <h2>
                                        {post.data.title}
                                    </h2>
                                    <img src={post.data.image}/>
                                </div>
                            })
                        }
                    </div>
                }
                {
                    (tab == 2 || isLargeDevice) && 
                    <div className={styles.progress}>
                    <div>
                        <h1>
                            Submissions List
                            { !isLargeDevice &&
                            <button>
                            { 
                                theme == "light"
                                ? <img src="/right_white.png"/>
                                : <img src="/right_black.png"/>
                            }
                            </button>
                            }
                        </h1>
                    </div>
                    {
                        submissionsList.reverse().map((s : any) => {
                        if (sanitizeUserId(s.author) === sanitizeUserId(global_user_id as string)) {
                        return <div className={styles.submission} onClick={() => {navigate(`problem/${s.problem_id}`, { replace: true });navigate(`problem/${s.problem_id}`, { replace: true });}}>
                          <h1>
                            Problem: {s.problem_id} - {s.problem_title}
                          </h1>
                          <h1>
                            Status: {s.total_good == s.total && <span style={{color:"rgb(80, 200, 80", fontWeight:"500"}}> Solved </span>} {s.total_good != s.total && <span style={{color:"rgb(200, 80, 80", fontWeight:"500"}}> Attempted </span>}
                          </h1>
                          <h1>
                            Time: {s.time}
                          </h1>
                        </div>
                      }})
                    }
                    </div>
                }
                <br/>
            </div>
        </div>
    )
}

export default Profile