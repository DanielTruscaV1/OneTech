import styles from "../new_styles/TopStyle.module.css"


interface User {
    user_id: number;
    username: string;
    email: string;
    image: string;
    description: string;
    location: string;
    language: string;
  }

  interface UserProps {
    user: User | null;
  }

const Top : React.FC<UserProps> = ({ user }) => {
  return (
    <div className={styles.top}>
        { user && 
        <>
        <h1>
            Welcome back, <span>{ user.username }!</span>
        </h1>
        <img src={ user.image} />
        <div className={styles.search}>
            <input 
                type="text"
            />
            <img src="/top1.png"/>
            <p>
                Search
            </p>
        </div>
        </>
        }
    </div>
  )
}

export default Top