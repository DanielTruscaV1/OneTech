import { useState } from "react";
import styles from "./PostStyles.module.css"
import axios from "axios";

const Post = ({ user, post } : {
    user : any;
    post : any;
}) => {

    const user_id = localStorage.getItem("userID");

    const [settings, setSettings] = useState(false);

    const [showComments, setShowComments] = useState(false);

    //@ts-ignore
    const [postComments, setPostComments] = useState<any>([]);

    const handleDelete = async () => {
        try 
        {
            const response = await axios.delete(
                `https://onetech.onrender.com/api/deletePost/${post.post_id}`
                //`http://localhost:3000/api/deletePost/${post.post_id}`
            );

            if(response)
            {
                window.location.reload();
            }
        }
        catch(error) 
        {
            console.log("Front-end error: ", error);
        }
    }

    //@ts-ignore
    const handleUpdate = async ({ id, p } : {
        id: string;
        p: {
            likes: number;
            comments: number;
            shares: number;
            saves: number;

            likedBy: string[];
        },
    }) => {
        if(!p.likedBy || !p.likedBy.includes(`${user_id}`))
        {
            try {
                const response = await axios.put(
                    `https://onetech.onrender.com/api/update_post/${id}`,
                    //`http://localhost:3000/api/update_post/${id}`,
                    {
                        likes: p.likes + 1,
                        comments: p.comments,
                        shares: p.shares,
                        saves: p.saves,

                        user_id,
                    }
                )

                console.log(response);
            }
            catch(error)
            {
                console.log(error);
            }
        }
        else {
            try {
                const response = await axios.put(
                    `https://onetech.onrender.com/api/update_post/${id}`,
                    //`http://localhost:3000/api/update_post/${id}`,
                    {
                        likes: p.likes - 1,
                        comments: p.comments,
                        shares: p.shares,
                        saves: p.saves,

                        user_id,
                    }
                )
        
                console.log(response);
            }
            catch(error)
            {
                console.log(error);
            }
        }
    }

    function timeAgo(postDate: string): string {
        const now: Date = new Date();
        const postCreationDate: Date = new Date(postDate);
        const secondsAgo: number = Math.floor((now.getTime() - postCreationDate.getTime()) / 1000);
      
        const intervals: { label: string, seconds: number }[] = [
          { label: 'year', seconds: 31536000 },
          { label: 'month', seconds: 2592000 },
          { label: 'day', seconds: 86400 },
          { label: 'hour', seconds: 3600 },
          { label: 'minute', seconds: 60 },
          { label: 'second', seconds: 1 },
        ];
      
        for (const interval of intervals) {
          const count: number = Math.floor(secondsAgo / interval.seconds);
          if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
          }
        }
      
        return 'just now';
      }

    //@ts-ignore
    const handleComments = async () => {
        if(showComments == false)
        {
            try 
            {
                const response = await axios.get(
                    `https://onetech.onrender.com/api/getComments/${post.post_id}`,
                );

                setPostComments(response.data.result.data);
            }
            catch(error)
            {
                console.log("Front-end error: ", error);
            }
        }
        setShowComments(!showComments);
    }

  return (
    <div className={styles.container}>
        <div className={styles.row}>
            <img 
                src={user.image}
            />
            <h1>
                {user.username}
            </h1>
            {
                user_id && post.author_id == user_id && settings == false &&
                    <img 
                        src="/home2.png"
                        style={{
                            marginLeft: "17vw",
                            marginRight: "1vw",
                            marginTop: "15px",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                        }}
                        onClick={() => setSettings(true)}
                    />
            }
            {
                user_id && post.author_id == user_id && settings == true &&
                    <div className={styles.settings}>
                        <p style={{marginLeft: "10vw"}}>
                            Edit
                        </p>
                        <p onClick={handleDelete}>
                            Delete
                        </p>
                        <p onClick={() => setSettings(false)}>
                            Cancel
                        </p>
                    </div>
            }
        </div>
        <div className={styles.row}>
            <img 
                src={post.image}
                className={styles.post_image}
            />
        </div>
        <div className={styles.row}>
            <button>
                <img 
                    src="/like1.png"
                    style={{
                        display: "inline-block",
                        marginRight: "0.7vw",
                        width: "20px",
                        height: "20px",
                        borderRadius: "0",
                    }}
                />
                Upvote
            </button>
            <button>
                <img 
                    src="/comment1.png"
                    style={{
                        display: "inline-block",
                        marginRight: "0.7vw",
                        width: "30px",
                        height: "30px",
                        borderRadius: "0",
                    }}
                />
                Comment
            </button>
            <h2 style={{color: "rgb(150, 150, 150)"}}>
                { timeAgo(post.date) }
            </h2>
        </div>
    </div>
  )
}

export default Post