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
                <img src={theme == "light" ? "/nav0.png" : "/nav000.png"}/>
            </button>
            <button onClick={() => navigate('/home')}>
                Home
            </button>
            <button onClick={() => navigate('/theory')}>
                Theory
            </button>
            <button onClick={() => navigate('/problemset')}>
                Problemset
            </button>
            <button onClick={() => navigate(`/profile/${user_id}`)}>
                Profile
            </button>
            <button>
                Terms
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