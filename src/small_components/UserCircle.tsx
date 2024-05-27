const UserCircle = ({image, name} : {
    image: string;
    name: string;
}) => {
  return (
    <div
        style={{
            display: "inline-block",
            width: "9%",
            height: "100%",
        }}
    >
        <img 
            src={ image }
            style={{
                marginLeft: "3rem",
                marginTop: "0.5rem",
                width: "calc(100% - 3.2rem)",
                height: "60%",
                borderRadius: "50%",
                border: "3px solid #00ADB5",
                cursor: "pointer",
            }}
        />
        <p 
            style={{
                marginLeft: "3rem",
                width: "calc(100% - 3.2rem)",
                textAlign: "center",
                fontWeight: "500",
            }}
        >
            { name }
        </p>
    </div>
  )
}

export default UserCircle