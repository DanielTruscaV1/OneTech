const UserImage = () => {
    const user = JSON.parse(localStorage.getItem("user") as any) as any;

  return (
    <div>
        <img 
          src={user.image}
          width="80px"
          height="80px"
          style={{
            position: "absolute",
            right: "2vw",
            top: "2vh",
            borderRadius: "50%",
          }}
        />
    </div>
  )
}

export default UserImage