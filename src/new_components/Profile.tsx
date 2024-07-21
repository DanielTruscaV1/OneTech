import { useState, useEffect } from "react"
import styles from "../new_styles/ProfileStyle.module.css"
import EditProfile from "./EditProfile"
import Sidebar from "./Sidebar"
import Top from "./Top"

import { User } from '../getUser.tsx';

import emailjs from 'emailjs-com';
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { useParams } from 'react-router-dom';

const Profile = () => {

    const { global_user_id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    const [followers, setFollowers] = useState<any>([]);
    const [posts, setPosts] = useState<any>([]);

    const user_id = localStorage.getItem("userID") as string;

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await axios.get(
            `https://onetech.onrender.com/api/users/${global_user_id}`
          ) as any;

          if (userData) {
            setUser(userData.data);
            await fetchData(userData); // Call fetchData after setUser
          } else {
            setError('Failed to fetch user data');
          }
          setLoading(false);
        };
      
        const fetchData = async (userData : User) => { // Accept userData as parameter
          if(userData) {
            const result = await axios.get(
              `https://onetech.onrender.com/api/followers/${global_user_id}`,
              //`http://localhost:3000/api/followers/${userData.user_id}`
            );
            setFollowers(result.data.followers);
            setPosts(result.data.posts);
          }
        };
      
        fetchUserInfo();
      }, []);
      

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleFollow = async () => {

        if(user && (!user.followedBy || !user.followedBy.includes(`${user_id}`)))
        {
            const response = await axios.get(
                "https://onetech.onrender.com/api/emails"
                //"http://localhost:3000/api/emails"
            )

            const result = await emailjs.send(response.data.service_id, response.data.template_id, {
                from: user?.username,
                user: "danieltrusca2008@gmail.com",
            }, response.data.user_id)

            if(result) {
                alert("Follow request sent successfully.");
            }

            const isOk = await axios.put(
                `https://onetech.onrender.com/api/follow_user/${user_id}/${global_user_id}`
                //`http://localhost:3000/api/follow_user/${user.user_id}/456`
            );
            console.log(isOk.data);
        }
        else 
            alert("User is already followed.");
    }

    const handleLogOut = async () => {
        localStorage.setItem("user", "");
        localStorage.setItem("userID", "");
        navigate("/sign-in");
    }

    const handleUpdate = async ({ id, p } : {
        id: number;
        p: {
            likes: number;
            comments: number;
            shares: number;
            saves: number;

            likedBy: string[];
        },
    }) => {
        if(!p.likedBy || !p.likedBy.includes(`${user_id}`))
        {
            try {
                const response = await axios.put(
                    `https://onetech.onrender.com/api/update_post/${id}`,
                    //`http://localhost:3000/api/update_post/${id}`,
                    {
                        likes: p.likes,
                        comments: p.comments,
                        shares: p.shares,
                        saves: p.saves,

                        user_id,
                    }
                )
        
                console.log(response);
            }
            catch(error)
            {
                console.log(error);
            }
        }
    }

  return (
    <div className={styles.profile}>
        <Sidebar/>
        {
            user && user.user_id == user_id &&
            <Top user={user}/>
        }
        {
            user && user.user_id == user_id &&
            <EditProfile user={user}/>
        }
        {
            user && user.user_id == user_id &&
            <button 
                className={styles.logout}
                onClick={handleLogOut}
            >
                Log-out
            </button>
        }
        { user &&
        <>
            <div className={styles.left}>

            <div className={styles.left_wrap}>
                <img 
                    src={user.image}
                    className={styles.image}
                />

                <div className={styles.info}>
                    <h1 className="text-2xl mb-4">
                        { user.username }
                    </h1>
                    <div className="w-full">
                        <h2 className={styles.status1}>&#9679;</h2>
                        <h2 className={styles.status2}>
                            Online
                        </h2>
                    </div>
                    <h2>
                        { user.followedBy && user.followedBy.length } Followers
                    </h2>
                </div>

            </div>
            
            <hr/>

            <div className={styles.info2}>
                <p>
                    { user.description }
                </p>
                <div>
                    <button onClick={handleFollow}>
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
        </div>
        <div className={styles.followers}>
            <hr/>
            <h2>
                Followers
            </h2>
            {
                followers.map((follower: any) => {
                    return <div 
                        className={styles.follower}
                        onClick={() => navigate(`/profile/${follower.data.user_id}`)}
                    >
                        <img src={follower.data.image}/>
                        <h1>
                            {follower.data.username}
                        </h1>
                        <p>
                            {follower.data.email}
                        </p>
                        <img
                            src="/right.png"
                            className={styles.continue}
                        />
                    </div>
                })
            }
        </div>
        <div className={styles.posts}>
            <hr/>
            <h2>
                Posts
            </h2>
            {
                user && user.user_id == user_id &&
                <button 
                    className={styles.create_post}
                    onClick={() => navigate('/create_post')}
                >
                    <img 
                        className={styles.icon}
                        src="/add1.png"
                    /> 
                    New Post
                </button>
            }
            {
                posts.map((post: any) => {
                    return <div className={styles.post}>
                        <h1>
                            {post.data.title}
                        </h1>
                        <img 
                            className={styles.post_image} 
                            src={post.data.image}
                            style={{
                                maxWidth: "90%",
                                maxHeight: "300px",
                            }}
                        />
                        {
                            post.data.likedBy && post.data.likedBy.includes(`${user?.user_id}`) &&
                            <div className={styles.button_bg}>
                                .
                            </div>
                        }
                        <img 
                    src="/home_icon_1.png"
                    onClick={() => handleUpdate({id: post.data.post_id, p: {
                        likes: post.data.likes + 1,
                        comments: post.data.comments,
                        shares: post.data.shares,
                        saves: post.data.saves,

                        likedBy: post.data.likedBy,
                    }})}
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.5rem",
                        fontSize: "18px",
                    }}
                >
                    { post.data.likes }
                </p>
                <img 
                    src="/home_icon_2.png"
                    onClick={() => handleUpdate({id: post.data.post_id, p: {
                        likes: post.data.likes,
                        comments: post.data.comments + 1,
                        shares: post.data.shares,
                        saves: post.data.saves,

                        likedBy: post.data.likedBy,
                    }})}
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.5rem",
                        fontSize: "18px",
                    }}
                >
                    { post.data.comments }
                </p>
                <img 
                    src="/home_icon_3.png"
                    onClick={() => handleUpdate({id: post.data.post_id, p: {
                        likes: post.data.likes,
                        comments: post.data.comments,
                        shares: post.data.shares + 1,
                        saves: post.data.saves,

                        likedBy: post.data.likedBy,
                    }})}
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.5rem",
                        fontSize: "18px",
                    }}
                >
                    { post.data.shares }
                </p>
                <img 
                    src="/home_icon_4.png"
                    onClick={() => handleUpdate({id: post.data.post_id, p: {
                        likes: post.data.likes,
                        comments: post.data.comments,
                        shares: post.data.shares,
                        saves: post.data.saves + 1,

                        likedBy: post.data.likedBy,
                    }})}
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.5rem",
                        fontSize: "18px",
                    }}
                >
                    { post.data.saves }
                </p>
                <br/>
                <br/>
                <br/>
                </div>
                })
            }
        </div>
        </>
        }
    </div>
  )
}

export default Profile