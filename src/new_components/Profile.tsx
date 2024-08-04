import { useState, useEffect } from "react"
import styles from "../new_styles/ProfileStyle.module.css"
//@ts-expect-error
import EditProfile from "./EditProfile"
import Sidebar from "./Sidebar"
//@ts-expect-error
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

    //@ts-expect-error
    const [followers, setFollowers] = useState<any>([]);
    //@ts-expect-error
    const [posts, setPosts] = useState<any>([]);

    const user_id = localStorage.getItem("userID") as string;

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await axios.get(
            `https://onetech.onrender.com/api/users/${global_user_id}`
          ) as any;

          if (userData) {
            setUser(userData.data);
            localStorage.setItem("user", JSON.stringify(userData.data));
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

    //@ts-expect-error
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

    //@ts-expect-error
    const handleLogOut = async () => {
        localStorage.setItem("user", "");
        localStorage.setItem("userID", "");
        navigate("/sign-in");
    }

    //@ts-expect-error
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


    //@ts-expect-error
    const createChat = () => {
        navigate(`/chat/${global_user_id}`);
    }

  return (
    <div className={styles.container}>
    <div className={styles.profile}>
        <Sidebar/>
        { user &&
        <>
            <h1 className={styles.path}>
                OneTech / Profile / {user.username}
            </h1>

            <div className={styles.left}>
            <div className={styles.left_wrap}>
                <img 
                    src={user.image}
                    className={styles.image}
                />
                <h1>
                    {user.username}
                </h1>
            </div>

            <br/>
            <div className={styles.box}>
                <h1>
                   {user.followedBy.length} followers 
                </h1>
                <button>
                    View followers
                </button>
                <button>
                    Follow
                </button>
            </div>  
            <div className={styles.box}>
                <h1>
                   About - {user.description}  
                </h1>
                
            </div>     
            <div className={styles.right}>
                <div className={styles.row}>
                    <p>
                        Posts
                    </p>
                    <button>
                        Search
                    </button>
                    <button>
                        Filter
                    </button>
                </div>
                
                   
            </div>
        </div>
        </>
        }
    </div>
    </div>
  )
}

export default Profile