import styles from "../new_styles/TheoryStyle.module.css"
import Sidebar from "./Sidebar"
import Top from "./Top"

import { getUserData, User } from '../getUser.tsx';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Theory = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    const user_id = localStorage.getItem("userID");

    const [articles, setArticles] = useState<any>([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await getUserData(user_id);
    
          if (userData) {
            setUser(userData);
          } else {
            setError('Failed to fetch user data');
          }
          setLoading(false);
        };
    
        const fetchArticles = async () => {
          try 
          {
              const response = await axios.get(
                "https://onetech.onrender.com/api/getArticles"
              );

              setArticles(response.data.result.data)
          }
          catch(error)
          {
              console.log(error);
          }
        }

        fetchUserInfo();

        fetchArticles();
      }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.theory}>
        <Sidebar/>
        <Top user={user}/>
        <div className={styles.content}>
          <input 
            type="text"
            placeholder="Search for an article.........."
          />

          
            {
              articles.map((a: any) => {
                return <div 
                    className={styles.article}
                    onClick={() => navigate(`/article/${a.data.article_id}`)}
                  >
                  <img src={a.data.thumbnail}/>
                  <div className={styles.article_info}>
                    <h1>
                      {a.data.title}
                    </h1>
                    <p>
                      | {a.data.views} views | {a.data.likes} likes | {a.data.read} |
                    </p>
                  </div>
                </div>
              })
            }
        </div>
    </div>
  )
}

export default Theory