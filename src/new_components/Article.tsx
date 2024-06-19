import styles from "../new_styles/Article.module.css"

import Sidebar from "./Sidebar"
import Top from "./Top"

import { getUserData, User } from '../getUser.tsx';
import { useEffect, useState } from "react";

const Article = () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  

    const user_id = localStorage.getItem("userID");

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
    
        fetchUserInfo();
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
                    <li>
                        Usage
                    </li>
                    <li>
                        Implementation
                    </li>
                    <li>
                        Examples
                    </li>
                    <li>
                        Language support
                    </li>
                    <li>
                        References
                    </li>
                </ul>
            </div>
            <div className={styles.content2}>
            <h1>
                Definition
            </h1>
            <p>
            In computer science, a data structure is a data organization, and storage format that is usually chosen for efficient access to data.[1][2][3] More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data,[4] i.e., it is an algebraic structure about data.                    
            </p>
            <h1>
                Usage
            </h1>
            <p>
            Data structures serve as the basis for abstract data types (ADT). The ADT defines the logical form of the data type. The data structure implements the physical form of the data type.[5]
            </p>
            <h1>
                Definition
            </h1>
            <p>
            In computer science, a data structure is a data organization, and storage format that is usually chosen for efficient access to data.[1][2][3] More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data,[4] i.e., it is an algebraic structure about data.                    
            </p>
            <h1>
                Usage
            </h1>
            <p>
            Data structures serve as the basis for abstract data types (ADT). The ADT defines the logical form of the data type. The data structure implements the physical form of the data type.[5]
            </p>
            </div>
            <div className={styles.content3}>
                <h1>
                    What is a data structure?
                </h1>
                <p>
                A data structure is a specialized format for organizing, managing, and storing data in a computer so that it can be accessed and modified efficiently. Data structures are fundamental to computer science and software engineering, as they provide the means to handle data in ways that enable efficient processing and retrieval.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Article