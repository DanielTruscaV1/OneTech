import styles from "../new_styles/HomeStyle.module.css"

import Sidebar from "./Sidebar"
import Top from "./Top"
import UserCircle from "../small_components/UserCircle"
import UserPost from "../small_components/UserPost"
//import UserComment from "../small_components/UserComment"
//import UserCircleHorizontal from "../small_components/UserCircleHorizontal"
import { getUserData, User } from '../getUser.tsx';

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import UserCircleHorizontal from "../small_components/UserCircleHorizontal.tsx"

const Home = () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  
    const [followedUsers, setFollowedUsers] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [posts, setPosts] = useState<any>([]);
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
    <div className={styles.home}>
        <Sidebar/>
        <Top user={user}/>

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
            <h1>
              Your Feed
            </h1>
            { !(window.innerWidth <= 768) &&
              <button style={{
                  marginLeft: "0vw",
                  width: "11%",
                }}
                onClick={() => {
                  setFilter(!filter)
                }}
              >
                {
                  !filter ?
                  <img className="" src="/show1.png"/> :
                  <img className="" src="/hide1.png"/>
                }
                Sort
              </button>
            }
            {
              filter &&
              <>
                <button 
                  onClick={() => {localStorage.setItem("post_order", "newest"); setOrder("newest");}}
                  style={{background: order == "newest" ? "linear-gradient(90deg, rgba(0,173,181,1) 0%, rgba(150,255,230,1) 100%)" : "#f5f5f5"}}
                >
                  Newest
                </button>
                <button  
                  onClick={() => {localStorage.setItem("post_order", "oldest"); setOrder("oldest");}}
                  style={{background: order == "oldest" ? "linear-gradient(90deg, rgba(0,173,181,1) 0%, rgba(150,255,230,1) 100%)" : "#f5f5f5"}}
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
              return <div>
                <UserPost 
                  user={returnUser(post.data.author_id).data}
                  post={post.data}
                />
                
              </div>
            })
          }
        </div>

        <div className={styles.aside}>
          {
            followedUsers.map((u: any) => {
              return <UserCircleHorizontal
                image={u.data.image}
                name={u.data.username}
                email={u.data.email}
              />
            })
          }
          
        </div>
    </div>
  )
}

export default Home