import PostComments from "@/new_components/PostComments";
import styles from "./BigPostStyle.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

const BigPost = ({ post, user, setShowPost } : {post: any, user: any, setShowPost: any}) => {

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

      const isLargeDevice = window.matchMedia("(min-width: 600px)").matches;

      const [postComments, setPostComments] = useState<any>([]);

      const handleComments = async () => {
        {
            try 
            {
                const response = await axios.get(
                    `https://onetech.onrender.com/api/getComments/${post.data.post_id}`,
                );

                setPostComments(response.data.result.data);
            }
            catch(error)
            {
                console.log("Front-end error: ", error);
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        handleComments();
    }, [])

  return (
    <div className={styles.container}>
        <div className={styles.body}>
            {
                isLargeDevice &&
                <div className={styles.row}>
                    
                    <img src={user.image} className={styles.author}/>
                    <h1 className={styles.title}>
                        {post.data.title}
                    </h1>
                    <p className={styles.date}>
                        {timeAgo(post.data.date)}
                    </p>
                    <button className={styles.exit} onClick={() => setShowPost(-1)}>
                        Close
                    </button>
                </div>
            }
            {
                !isLargeDevice &&
                <div className={styles.column}>
                    
                    <img src={user.image} className={styles.author}/>
                    <h1 className={styles.title}>
                        {post.data.title}
                    </h1>
                    <p className={styles.date}>
                        {timeAgo(post.data.date)}
                    </p>
                    <button className={styles.exit} onClick={() => setShowPost(-1)}>
                        Close
                    </button>
                </div>
            }
            <img src={post.data.image} className={styles.post_image}/>

            <div className={styles.actions}>
                <button>
                    {
                        localStorage.getItem("theme") == "light" ? 
                        <img src="/upvote_white.png"/>:<img src="/upvote_black.png"/>
                    }
                    Upvote
                </button>
                <button>
                    {
                        localStorage.getItem("theme") == "light" ? 
                        <img src="/downvote_white.png"/>:<img src="/downvote_black.png"/>
                    }
                    Downvote
                </button>
                <button>
                    {
                        localStorage.getItem("theme") == "light" ? 
                        <img src="/share_white.png"/>:<img src="/share_black.png"/>
                    }
                    Share
                </button>
                <button>
                    {
                        localStorage.getItem("theme") == "light" ? 
                        <img src="/save_white.png"/>:<img src="/save_black.png"/>
                    }
                    Save
                </button>
            </div>

            <div className={styles.comments}>
                <h1>
                    Comments
                </h1>
                <PostComments post_id={post.data.post_id} comments={postComments}/>
            </div>
            
        </div>
    </div>
  )
}

export default BigPost