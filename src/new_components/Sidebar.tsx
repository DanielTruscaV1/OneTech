import { useState } from "react"
import styles from "../new_styles/SidebarStyle.module.css"



const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);

  return (
    <>
    {   sidebar ?
        <div className={styles.sidebar}>
            <div className={styles.gap}>
                
            </div>
            <button onClick={() => setSidebar(false)}>
                <img src="/nav0.png"/>
            </button>
            <button>
                <img src="/nav11.png"/>
            </button>
            <button>
                <img src="/nav22.png"/>
            </button>
            <button>
                <img src="/nav33.png"/>
            </button>
            <button>
                <img src="/nav4.png"/>
            </button>
            <button>
                <img src="/nav5.png"/>
            </button>
            <button>
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
            src="/nav00.png"
            className={styles.show}
            onClick={() => setSidebar(true)}
        />
    }
    </>
  )
}

export default Sidebar