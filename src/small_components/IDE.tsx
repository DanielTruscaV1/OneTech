import IDEEditor from "./IDEEditor"
import IDESettings from "./IDESettings"

const IDE = () => {
  return (
    <div style={{
        position: "absolute",
        right: "6vw",
        top: "15vh",
        width: "31vw",
        height: "79vh",
        backgroundColor: "#F8F8F8",
        borderRadius: "10px",
    }}>
        <IDESettings/>
        <IDEEditor/>
    </div>
  )
}

export default IDE