import { useState } from "react"
import styles from "../new_styles/SidebarStyle.module.css"

import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);

    const navigate = useNavigate();

    const user_id = localStorage.getItem("userID");

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
            <button>
                <img src="/nav4.png"/>
            </button>
            <button>
                <img src="/nav5.png"/>
            </button>
            <button onClick={() => navigate(`/profile/${user_id}`)}>
                <img src="/nav6.png"/>
            </button>
            <button>
                <img src="/nav77.png"/>
            </button>
            <div className={styles.theme}>
                <img 
                    className={styles.sun}
                    src="/nav88.png"
                />
                <img 
                    className={styles.moon}
                    src="/nav99.png"
                />
                <div className={styles.toggle1}>  
                    <div className={styles.toggle2}>

                    </div>
                </div>
            </div>
        </div>
        :
        <img 
            src="/menu1.png"
            className={styles.show}
            onClick={() => setSidebar(true)}
        />
    }
    </>
  )
}

export default Sidebar