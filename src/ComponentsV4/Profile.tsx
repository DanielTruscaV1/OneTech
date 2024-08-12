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

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userData = await axios.get(
              `https://onetech.onrender.com/api/users/${global_user_id}`
            ) as any;
  
            if (userData) {
              setUserInfo(userData.data);
              if(global_user_id == localStorage.getItem("userID")) 
              {
                localStorage.setItem("user", JSON.stringify(userData.data));
              }
              localStorage.setItem("user_id", JSON.stringify(userData.data.user_id));
              await fetchData(); // Call fetchData after setUser
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
      
        fetchUserInfo();
      }, []);

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
                            Passionate and detail-oriented Software Developer with 5+ years of experience in designing, developing, and deploying innovative software solutions. Proficient in a diverse set of programming languages and technologies, including Java, Python, and JavaScript, with a strong background in both front-end and back-end development. Adept at problem-solving, collaborating with cross-functional teams, and delivering high-quality code on time. Committed to staying current with industry trends and continuously improving technical skills to drive impactful projects and enhance user experiences.
                        </div>
                        <div className={styles.card}>
                            <h1>
                                Location & Contact
                            </h1>
                            Gorj, Romania
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
                    (tab == 1 || isLargeDevice) && 
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
                    <>
                    </>
                }
                <br/>
            </div>
        </div>
    )
}

export default Profile