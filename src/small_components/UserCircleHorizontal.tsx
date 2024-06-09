const UserCircleHorizontal= ({image, name, email} : {
    image: string;
    name: string;
    email: string;
}) => {
  return (
    <div
        style={{
            paddingTop: "1.5rem",
            display: "block",
            width: "100%",
        }}
        className="user_circle_horizontal"
    >
        <img 
            src={ image }
            style={{
                display: "inline-block",
                marginLeft: "1vw",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border: "3px solid #00ADB5",
                cursor: "pointer",
            }}
        />
        <p 
            style={{
                position: "relative",
                top: "-1rem",
                display: "inline-block",
                marginLeft: "1vw",
                width: "25%",
                textAlign: "center",
                fontWeight: "500",
            }}
        >
            { name }
        </p>
        <p 
            style={{
                position: "relative",
                top: "-1.5rem",
                display: "inline-block",
                marginLeft: "6vw",
                width: "25%",
                textAlign: "left",
                fontWeight: "500",
                fontSize: "14px",
                color: "gray",
            }}
        >
            { email }
        </p>
    </div>
  )
}

export default UserCircleHorizontal