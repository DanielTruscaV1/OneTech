import Footer from "./Footer"
import LeftSidebar from "./LeftSidebar"

// @ts-ignore: TS6133
import TopSidebar from "./TopSidebar"

import styles from "./HomeStyle.module.css";
import { useEffect, useState } from "react";

interface Document {
  data: {
    author: string;
    title: string;
    tags: string[];
  }
}

import axios from "axios";
import CreatePost from "./CreatePost";

const Home = () => {
  const [posts, setPosts] = useState<Document[] | null>(null);
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

  return (
    <div>
      <LeftSidebar/>
      <TopSidebar/>
    </div>
  )
}

export default Home