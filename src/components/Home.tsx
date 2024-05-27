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
    },
    {
      image: "/home_user_2.png",
      name: "Yone",
    },
  ]

  return (
    <div className={styles.container}>
      <LeftSidebar/>
      <TopSidebar/>
      <div className={styles.top_container}>
        <UserCircle image={mock_db[0].image} name={mock_db[0].name}/>
        <UserCircle image={mock_db[1].image} name={mock_db[1].name}/>
      </div>
    </div>
  )
}

export default Home