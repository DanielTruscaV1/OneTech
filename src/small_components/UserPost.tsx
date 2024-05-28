const UserPost = ({ user, post } : {
    user : {
        image: string;
        name: string;
        email: string;
    },
    post : {
        image: string;
        likes: number;
        comments: number;
        shares: number;
        saves: number;
    }
}) => {
  return (
    <div
        style={{
            display: "block",
            width: "100%",
            height: "100%",
            backgroundColor: "#F8F8F8",
            borderRadius: "10px",
        }}
    >
        <img 
            src={ user.image }
            style={{
                position: "absolute",
                left: "3rem",
                top: "2vh",
                width: "3.5rem",
                height: "3.5rem",
                border: "3px solid #00ADB5",
                borderRadius: "50%",
                cursor: "pointer",
            }}
        />
        <p
            style={{
                position: "absolute",
                left: "8rem",
                top: "2vh",
                width: "8rem",
                height: "1rem",
                fontSize: "20px",
                fontWeight: "700",
            }}
        >
            { user.name }
        </p>
        <p
            style={{
                position: "absolute",
                left: "8rem",
                top: "6vh",
                width: "8rem",
                height: "1rem",
                fontSize: "16px",
                color: "gray",
            }}
        >
            { user.email }
        </p>
        <img 
            src="/home2.png"
            style={{
                position: "absolute",
                right: "2rem",
                top: "2vh",
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
            }}
        />
        <img 
            src={ post.image }
            style={{
                position: "absolute",
                left: "12%",
                top: "12vh",
                width: "80%",
                height: "65%",
                borderRadius: "10px",
                cursor: "pointer",
            }}
        />
        <div 
            style={{
                position: "absolute",
                left: "13%",
                top: "calc(65% + 14vh)",
                width: "80%",
                borderRadius: "10px",
            }}
        >  
            <div
                style={{
                    display: "inline-block",
                    marginLeft: "13%",
                }}
            >
                <img 
                    src="/home_icon_1.png"
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
                        fontSize: "18px",
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
                        fontSize: "18px",
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
                        fontSize: "18px",
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
                        fontSize: "18px",
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