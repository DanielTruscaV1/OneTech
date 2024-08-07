import { useEffect, useState } from "react";
import Header from "./Header"
import styles from "./HomeStyle.module.css"
import { getUserData, User } from "@/getUser";
import axios from "axios";

const Home = () => {

  const  global_user_id  = JSON.parse(localStorage.getItem("user") as string).user_id;

  const [loading, setLoading] = useState<boolean>(true);

  //@ts-ignore
  const [user, setUser] = useState<User | null>(null);
  //@ts-ignore
  const [followedUsers, setFollowedUsers] = useState<any>([]);
  //@ts-ignore
  const [users, setUsers] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  //@ts-ignore
  const [filter, setFilter] = useState<any>(window.innerWidth <= 768);
  //@ts-ignore
  const [order, setOrder] = useState<any>(localStorage.getItem("post_order"));

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = await getUserData(global_user_id);

      if (userData) {
        setUser(userData);

        await fetchHomeInfo({user_id: userData.user_id});
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

  const [tab, setTab] = useState<number>(0);

  const isLargeDevice = window.matchMedia("(min-width: 600px)").matches;

  if (loading) return <>Loading...</>;

  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.body}>
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
              Posts
            </button>
            <button 
              className={styles.tab}
              style={{
                backgroundColor: tab == 1 ? "var(--color1)" : "var(--color3)",
                color: tab == 1 ? "var(--color5)" : "var(--color4)",
              }}
              onClick={() => setTab(1)}
            >
              Followers
            </button>
          </div>
        }         
        {
          (tab == 0 || isLargeDevice) && posts.map((post : any) => {
            return <div className={styles.card}>
              <h2>
                {post.data.title}
              </h2>
              <img src={post.data.image}/>
            </div>
          })
        }
        {
          (tab == 1  || isLargeDevice) && 
          <div className={styles.followers}>
            {
            followedUsers.map((follower : any) => {
                return <div className={styles.box}>
                  <img src={follower.data.image}/>
                  <h2>
                    {follower.data.username}
                  </h2>
                </div>
              })
            }
          </div>
        }
      </div>
      <br/>
    </div>
  )
}

export default Home