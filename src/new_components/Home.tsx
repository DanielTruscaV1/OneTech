import styles from "../new_styles/HomeStyle.module.css"

import Sidebar from "./Sidebar"
import Top from "./Top"
import UserCircle from "../small_components/UserCircle"
import UserPost from "../small_components/UserPost"
import UserComment from "../small_components/UserComment"
import UserCircleHorizontal from "../small_components/UserCircleHorizontal"
import { getUserData, User } from '../getUser.tsx';

import { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {
  const mock_db = [
    {
      image: "/home_user_1.png",
      name: "Kayn",
      email: "kayn@gmail.com",
    },
    {
      image: "/home_user_2.png",
      name: "Yone",
      email: "yone@gmail.com",
    },
    {
      image: "/home_user_4.png",
      name: "Sett",
      email: "sett@gmail.com",
    },
    {
      image: "/home_user_5.png",
      name: "Aphelios",
      email: "aphelios@gmail.com",
    },
  ]

  const mock_feed_user = [
    {
      image: "/home_user_3.png",
      name: "Ezreal",
      email: "ezreal@email.com"
    },
    {
      image: "/home_user_6.png",
      name: "Akali",
      email: "akali@email.com",
    }
  ]
  
  const mock_feed_post = [
    {
      image: "/home_post_1.jpg",
      likes: 123,
      comments: 45,
      shares: 16,
      saves: 7,
    },
    {
      image: "/home_post_3.png",
      likes: 123,
      comments: 45,
      shares: 16,
      saves: 7,
    }
  ]

  const mock_comment_user = [
    {
      image: "/home_user_4.png",
      name: "Sett",
      email: "sett@gmail.com",
    },
    {
      image: "/home_user_7.png",
      name: "Evelynn",
      email: "evelynn@gmail.com",
    }
  ]

  const mock_comment_content = [
    {
      text: `Heartsteel, the newly announced band made up of League of Legends champions, has released its first single PARANOIA, finally giving us an idea of just how the band will sound.      `,
      tags: "8 minutes ago #HEARTSTEEL #paranoia #LoL"
    },
    {
      text: `"More" (stylized in all caps) is a song by virtual girl group K/DA. The song was released on October 28, 2020, as the second single for the group's debut extended play All Out.`,
      tags: "13 minutes ago #K/DA #MORE #LoL"
    },
  ]

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  
    const [followedUsers, setFollowedUsers] = useState<any>([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await getUserData();
    
          if (userData) {
            setUser(userData);

            await fetchHomeInfo({user_id: userData.user_id});
          } else {
            setError('Failed to fetch user data');
          }
          setLoading(false);
        };

        const fetchHomeInfo = async (user : {
          user_id: number;
        }) => {
          try
          {
            const response  = await axios.get(
              `https://onetech.onrender.com/api/getHomeInfo/${user.user_id}`,
              //`http://localhost:3000/api/getHomeInfo/${user.user_id}`,
            );

            setFollowedUsers(response.data.followedUsers);

            console.log(followedUsers)
          }
          catch(error)
          {
            console.log("Front-end error: ", error);
          }
        }
    
        fetchUserInfo();

      }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

   

  return (
    <div className={styles.home}>
        <Sidebar/>
        <Top user={user}/>


        <div className={styles.stories}>
          {
            followedUsers &&
            followedUsers.map((user: any) => {
              return <UserCircle 
                image={user.data.image}
                name={user.data.username}
              />
            })
          }   
        </div>


        <div className={styles.feed}>
          <UserPost user={mock_feed_user[0]} post = {mock_feed_post[0]}/>
          <UserComment user={mock_comment_user[0]} content={mock_comment_content[0]}/>
          <UserPost user={mock_feed_user[1]} post = {mock_feed_post[1]}/>
          <UserComment user={mock_comment_user[1]} content={mock_comment_content[1]}/>
        </div>


        <div className={styles.aside}>
          <img 
            className={styles.aside_image}
            src='/home_aside_1.jpg'
          />
          <UserCircleHorizontal image={mock_db[0].image} name={mock_db[0].name} email={mock_db[0].email}/>
          <UserCircleHorizontal image={mock_db[1].image} name={mock_db[1].name} email={mock_db[1].email}/>
        </div>  
    </div>
  )
}

export default Home