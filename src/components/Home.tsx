import LeftSidebar from "./LeftSidebar"

// @ts-ignore: TS6133
import TopSidebar from "./TopSidebar"

import { useEffect, useState } from "react";

import styles from "./HomeStyle.module.css"

interface Document {
  data: {
    author: string;
    title: string;
    tags: string[];
  }
}

import axios from "axios";
// @ts-ignore: TS6133
import CreatePost from "./CreatePost";
import UserCircle from "../small_components/UserCircle";
import UserPost from "../small_components/UserPost";
import UserCircleHorizontal from "../small_components/UserCircleHorizontal";

const Home = () => {
  // @ts-ignore: TS6133
  const [posts, setPosts] = useState<Document[] | null>(null);
  // @ts-ignore: TS6133
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts`);
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, []);

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
  ]

  const mock_feed_user = {
    image: "/home_user_3.png",
    name: "Ezreal",
    email: "ezreal@email.com"
  }

  const mock_feed_post = {
    image: "/home_post_1.jpg",
    likes: 123,
    comments: 45,
    shares: 16,
    saves: 7,
  }

  return (
    <div className={styles.container}>
      <LeftSidebar/>
      <TopSidebar message="Welcome back, Ezreal!" />
      <div className={styles.top_container}>
        <UserCircle image={mock_db[0].image} name={mock_db[0].name}/>
        <UserCircle image={mock_db[1].image} name={mock_db[1].name}/>
        <UserCircle image={mock_db[2].image} name={mock_db[2].name}/>
      </div>
      <div className={styles.feed_container}>
        <UserPost user={mock_feed_user} post = {mock_feed_post}/>
      </div>
      <div className={styles.aside_container}>
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