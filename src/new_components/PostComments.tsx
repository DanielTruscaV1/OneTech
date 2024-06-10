import { useState } from "react";
import styles from "../new_styles/PostCommentsStyle.module.css";
import axios from "axios";

const PostComments = ({post_id, comments} : {post_id: string; comments: any;}) => {
  const user_info = JSON.parse(localStorage.getItem("user") as string);
  const user_id = localStorage.getItem("userID");

  const [comment, setComment] = useState<any>();

  const handleSubmit = async () => {
    try 
    {
      const response = await axios.post(
        "https://onetech.onrender.com/api/createComment",
        //"http://localhost:3000/api/createComment",
        {
          post_id,
          author_id: user_id,
          content: comment,
        }
      )

      console.log(response);
    }
    catch(error)
    {
      console.log("Front-end error: ", error);
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

  return (
    <div className={styles.comments}>
        <hr/>
        <br/>
        {
          comments.map((c: any) => {
            return <>
              <img src={c.data.author_image}/>
              <h2>
                  {c.data.author_username}
              </h2>
              <div className={styles.container}>
                  <p>
                  {c.data.content}
                  </p>
                  <h3>
                  {timeAgo(c.data.date)}
                  </h3>
              </div>
              <br/>
            </>
          })
        }
        <hr/>
        <div>
          <img 
            className={styles.icon}
            src="/add1.png"
          />
          <p className="inline-block w-50 ml-3 mt-3 text-3xl">
            Create a new comment as {user_info.username}
          </p>
          <br/>
          <input 
            type="text"
            placeholder="New comment....."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleSubmit}>
            Submit
          </button>
        </div>
        
    </div>
  )
}

export default PostComments