import styles from "../new_styles/TopStyle.module.css"


interface User {
    user_id: string;
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
           
        </div>
        </>
        }
    </div>
  )
}

export default Top