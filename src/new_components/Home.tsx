import styles from "../new_styles/HomeStyle.module.css"

import Sidebar from "./Sidebar"
//@ts-expect-error
import Top from "./Top"
import UserCircle from "../small_components/UserCircle"
//@ts-ignore
import UserPost from "../small_components/UserPost"
//import UserComment from "../small_components/UserComment"
//import UserCircleHorizontal from "../small_components/UserCircleHorizontal"
import { getUserData, User } from '../getUser.tsx';

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
//@ts-ignore
import UserCircleHorizontal from "../small_components/UserCircleHorizontal.tsx"
import Post from "./Post.tsx"

const Home = () => {

    //@ts-expect-error
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  
    const [followedUsers, setFollowedUsers] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [posts, setPosts] = useState<any>([]);
    //@ts-ignore
    const [filter, setFilter] = useState<any>(window.innerWidth <= 768);
    const [order, setOrder] = useState<any>(localStorage.getItem("post_order"));

    const user_id = localStorage.getItem("userID") as string;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await getUserData(user_id);
    
          if (userData) {
            setUser(userData);

            await fetchHomeInfo({user_id: userData.user_id});
          } else {
            setError('Failed to fetch user data');
          }
          setLoading(false);
        };

        const fetchHomeInfo = async (user : {
          user_id: string;
        }) => {
          try
          {
            const response  = await axios.get(
              `https://onetech.onrender.com/api/getHomeInfo/${user.user_id}`,
              //`http://localhost:3000/api/getHomeInfo/${user.user_id}`,
            );
            setFollowedUsers(response.data.followedUsers);
            setUsers(response.data.users.data);
            if(order == "newest")
              setPosts(response.data.posts.data.reverse());
            else if(order == "oldest")
              setPosts(response.data.posts.data);
            else
              setPosts(response.data.posts.data.reverse());
          }
          catch(error)
          {
            console.log("Front-end error: ", error);
          }
        }
    
        fetchUserInfo();

      }, [order]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const returnUser = (user_id: any) => {
      const answer = users.filter((u: any) => u.data.user_id == user_id)[0];
      return answer;
    }

  return (
    <div className={styles.container}>
    <div className={styles.home}>
        <Sidebar/>
        <div className={styles.stories}>
          {
            followedUsers &&
            followedUsers.map((user: any) => {
              return <div 
                  onClick={() => navigate(`/profile/${user.data.user_id}`)}
                  className="inline-block"
                >
                <UserCircle 
                  image={user.data.image}
                  name={user.data.username}
                />
              </div>
            })
          }   
        </div>

        <div className={styles.filter}>
          <div>
            {
              <>
                <button 
                  onClick={() => {localStorage.setItem("post_order", "newest"); setOrder("newest");}}
                >
                  Newest
                </button>
                <button  
                  onClick={() => {localStorage.setItem("post_order", "oldest"); setOrder("oldest");}}
                >
                  Oldest
                </button>
                <button>
                  Top
                </button>
                <button>
                  Hot
                </button>
              </>
            }
          </div>
        </div>

        <div className={styles.feed}>
          {
            posts && 
            posts.map((post: any) => {
              return <div style={{display: "inline-block"}}>
                <Post 
                  user={returnUser(post.data.author_id).data}
                  post={post.data}
                />
                
              </div>
            })
          }
        </div>
    </div>
    </div>
  )
}

export default Home