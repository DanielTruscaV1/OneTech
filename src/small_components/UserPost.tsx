import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPost = ({ user, post } : {
    user : any;
    post : any;
}) => {
    const navigate = useNavigate();

    const user_id = localStorage.getItem("userID");

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
                        likes: p.likes,
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
  return (
    <div
        style={{
            display: "block",
            marginTop: "3vh",
            width: "100%",
            height: "100%",
            backgroundColor: "#F8F8F8",
            borderRadius: "10px",
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
        <img 
            src="/home2.png"
            style={{
                position: "relative",
                left: "90%",
                top: "-9vh",
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
            }}
            className="user_post_settings"
        />
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
                    background: "linear-gradient(90deg, rgba(0,173,181,1) 0%, rgba(150,255,230,1) 100%)",
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
                        likes: post.likes + 1,
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
    </div>
  )
}

export default UserPost