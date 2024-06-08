import styles from "../new_styles/TheoryStyle.module.css"
import Sidebar from "./Sidebar"
import Top from "./Top"

import { getUserData, User } from '../getUser.tsx';
import { useEffect, useState } from "react";

const Theory = () => {
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
    <div className={styles.theory}>
        <Sidebar/>
        <Top user={user}/>
        <div className={styles.current}>
            <h1>
                Current Chapter - 1. Variables
            </h1>
            <p>
                30 minutes reading
            </p>
            <p>
                50% completed
            </p>
            <div className={styles.progress1}>
                <div className={styles.progress2}>
                
                </div>
            </div>
        </div>
        <div className={styles.content}>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
        </div>
    </div>
  )
}

export default Theory