import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostComments from "../new_components/PostComments";

const UserPost = ({ user, post } : {
    user : any;
    post : any;
}) => {
    const navigate = useNavigate();

    const user_id = localStorage.getItem("userID");

    const [settings, setSettings] = useState(false);

    const [showComments, setShowComments] = useState(false);

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
    <div
        style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            marginTop: "3vh",
            marginBottom: "6vh",
            width: "100%",
            borderTop: "2px solid rgb(220, 220, 220)",
              borderBottom: "2px solid rgb(220, 220, 220)",
              borderLeft: "2px solid rgb(220, 220, 220)",
              borderRight: "2px solid rgb(220, 220, 220)",
        }}
        className="user_post"
    >
        <img 
            src={ user.image }
            style={{
                position: "relative",
                left: "3rem",
                top: "2vh",
                width: "3.5rem",
                height: "3.5rem",
                border: "3px solid #00ADB5",
                borderRadius: "50%",
                cursor: "pointer",
            }}
            className="user_post_author1"
            onClick={() => navigate(`/profile/${user.user_id}`)}
        />
        <p
            style={{
                position: "relative",
                left: "8rem",
                top: "-5vh",
                width: "8rem",
                height: "1rem",
                fontSize: "20px",
                fontWeight: "700",
            }}
            className="user_post_author2"
        >
            { user.username }
        </p>
        <p
            style={{
                position: "relative",
                left: "8rem",
                top: "-3.5vh",
                width: "8rem",
                height: "1rem",
                fontSize: "16px",
                color: "gray",
            }}
            className="user_post_author3"
        >
            { user.email }
        </p>
        {
            user_id && post.author_id == user_id && settings == false &&
            <img 
                src="/home2.png"
                style={{
                    position: "relative",
                    left: "93%",
                    top: "-9vh",
                    width: "2rem",
                    height: "2rem",
                    cursor: "pointer",
                }}
                className="user_post_settings"
                onClick={() => setSettings(true)}
            />
        }
        {
            user_id && post.author_id == user_id && settings == true &&
            <div className="settings">
                <p>
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
        {
            !(user_id && post.author_id == user_id) && 
            <>
                <br/>
            </>
        }
        <div className="user_post_info">
            <img 
                src={ post.image }
                style={{
                    position: "relative",
                    left: "12%",
                    top: "-3.5vh",
                    width: "80%",
                    height: "65%",
                    borderRadius: "10px",
                    cursor: "pointer",
                }}
                className="user_post_image"
            />
            <div className="user_post_schema">
                {
                    post.date && 
                    <p>
                        { timeAgo(post.date) }
                    </p>
                }
                <h1>
                    {post.title}
                </h1>
                <h2>
                    {post.description}
                </h2>
                <p>
                    {post.tags}
                </p>
            </div>
        </div>
        <div 
            style={{
                position: "relative",
                left: "13%",
                top: "-2vh",
                width: "80%",
                borderRadius: "10px",
            }}
            className="user_post_actions"
        >  
            <div
                style={{
                    display: "inline-block",
                    marginLeft: "13%",
                    background: post.likedBy.includes(user_id) ? "linear-gradient(90deg, rgba(0,173,181,1) 0%, rgba(150,255,230,1) 100%)" : "",
                    padding: "7px",
                    paddingRight: "15px",
                    height: "50px",
                    borderRadius: "7.5px",
                }}
            >
                <img 
                    src="/home_icon_1.png"
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                    onClick={() => handleUpdate({id: post.post_id, p: {
                        likes: post.likes,
                        comments: post.comments,
                        shares: post.shares,
                        saves: post.saves,

                        likedBy: post.likedBy,
                    }})}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.2rem",
                        fontSize: "21px",
                    }}
                >
                    { post.likes }
                </p>
            </div>
            <div
                style={{
                    display: "inline-block",
                    marginLeft: "13%",
                }}
            >
                <img 
                    src="/home_icon_2.png"
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.2rem",
                        fontSize: "21px",
                    }}
                >
                    { post.comments }
                </p>
            </div>
            <div
                style={{
                    display: "inline-block",
                    marginLeft: "13%",
                }}
            >
                <img 
                    src="/home_icon_3.png"
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.2rem",
                        fontSize: "21px",
                    }}
                >
                    { post.shares }
                </p>
            </div>
            <div
                style={{
                    display: "inline-block",
                    marginLeft: "13%",
                }}
            >
                <img 
                    src="/home_icon_4.png"
                    style={{
                        display: "inline-block",
                        width: "22px",
                        height: "22px",
                    }}
                />
                <p 
                    style={{
                        display: "inline-block",
                        marginLeft: "10px",
                        position: "relative",
                        top: "0.2rem",
                        fontSize: "21px",
                    }}
                >
                    { post.saves }
                </p>
            </div>
        </div>
        <p 
            className="mt-8 text-center cursor-pointer"
            onClick={handleComments}
        >
            {
                !showComments && 
                <>
                    <img className="inline-block w-6 h-6 mr-3" src="/expand1.png"/>
                    Show Comments
                </>
                
            }
            {
                showComments && 
                <>
                    <img className="inline-block w-6 h-6 mr-3" src="/expand2.png"/>
                    Hide Comments
                </>
                
            }
        </p>
        <br/>
        
        {
            showComments &&
            <>
                <PostComments post_id={post.post_id} comments={postComments}/>
            </>
        }
    </div>
  )
}

export default UserPost