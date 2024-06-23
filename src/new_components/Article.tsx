import styles from "../new_styles/Article.module.css"

import Sidebar from "./Sidebar"
import Top from "./Top"

import { getUserData, User } from '../getUser.tsx';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Article = () => {
    const { article_id } = useParams();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    const user_id = localStorage.getItem("userID");

    const [article, setArticle] = useState<any>(null);

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

        const fetchArticleById = async () => {
            try 
            {
                const response = await axios.get(
                  `https://onetech.onrender.com/api/getArticleById/${article_id}`
                );

                setArticle(response.data.result.data[0])
            }
            catch(error)
            {
                console.log(error);
            }
        }
    
        fetchUserInfo();

        fetchArticleById();
      }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.article}>
        <Sidebar/>
        <Top user={user}/>
        <div className={styles.content}>
            <div className={styles.content1}>
                <ul>
                    {article && article.data.sections.map((s : any) => {
                        return <li>
                            {s}
                        </li>
                    })}
                </ul>
            </div>
            <div className={styles.content2}>
                {
                  article && article.data.sections.map((s: any, index: number) => {
                        return (
                            <>
                                <h1>
                                    {s}
                                </h1>
                                <p>
                                    {article.data.content[index]}
                                </p>
                            </>
                        );
                    })
                }
            </div>
            <div className={styles.content3}>
            {
                  article && article.data.questions.map((q: any, index: number) => {
                        return (
                            <>
                                <h1>
                                    {q}
                                </h1>
                                <p>
                                    {article.data.answers[index]}
                                </p>
                            </>
                        );
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Article