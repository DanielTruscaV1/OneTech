import { useState } from "react"
import styles from "../new_styles/SidebarStyle.module.css"

import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);

    const navigate = useNavigate();

    const user_id = localStorage.getItem("userID");

    const theme = localStorage.getItem("theme");

  return (
    <>
    {   sidebar ?
        <div className={styles.sidebar}>
            <div className={styles.gap}>
                
            </div>
            <button onClick={() => setSidebar(false)}>
                <img src="/nav0.png"/>
            </button>
            <button onClick={() => navigate('/home')}>
                <img src="/nav11.png"/>
            </button>
            <button onClick={() => navigate('/theory')}>
                <img src="/nav22.png"/>
            </button>
            <button onClick={() => navigate('/problemset')}>
                <img src="/nav33.png"/>
            </button>
            <button onClick={() => navigate(`/profile/${user_id}`)}>
                <img src="/nav6.png"/>
            </button>
            <button>
                <img src="/nav77.png"/>
            </button>
        </div>
        :
        <>
        {   theme === "light" ?
            <img 
                src="/menu2.png"
                className={styles.show}
                onClick={() => setSidebar(true)}
            /> :
            <img 
                src="/menu3.png"
                className={styles.show}
                onClick={() => setSidebar(true)}
            /> 
        }
        </>
    }
    </>
  )
}

export default Sidebar