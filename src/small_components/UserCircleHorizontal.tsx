const UserCircleHorizontal= ({image, name, email} : {
    image: string;
    name: string;
    email: string;
}) => {
  return (
    <div
        style={{
            marginTop: "2rem",
            display: "block",
            width: "100%",
            height: "15%",
        }}
    >
        <img 
            src={ image }
            style={{
                display: "inline-block",
                marginLeft: "3vw",
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
                marginLeft: "0vw",
                width: "25%",
                textAlign: "center",
                fontWeight: "500",
            }}
        >
            { name }
        </p>
        <p 
            style={{
                display: "inline-block",
                marginLeft: "4.5vw",
                width: "7.5%",
                textAlign: "center",
                fontWeight: "500",
                color: "#00ADB5",
                cursor: "pointer",
            }}
        >
            Follow
        </p>
        <p 
            style={{
                position: "relative",
                top: "-2.5rem",
                display: "inline-block",
                marginLeft: "9vw",
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