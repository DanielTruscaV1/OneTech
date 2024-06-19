import styles from "../V3Styles/Sidebar.module.css"

import { useState } from "react";

const Sidebar = () => {

    const [mode, setMode] = useState(false);

  return (
    <div className={styles.sidebar_container}>
        {
            mode === false && 
            <>
                <button onClick={() => setMode(true)}>
                    <img src="/sidebarSVG00.svg"/>
                </button>
            </>
        }
        {
            mode === true &&
            <div className={styles.sidebar}>
                <button onClick={() => setMode(false)}>
                    <img src="/sidebarSVG0.svg"/>
                </button>
                <button>
                    <img src="/sidebarSVG1.svg"/>
                    <p>
                        Home
                    </p>
                </button>
                <button>
                    <img src="/sidebarSVG2.svg"/>
                    <p>
                        Theory
                    </p>
                </button>
                <button>
                    <img src="/sidebarSVG3.svg"/>
                    <p>
                        Problemset
                    </p>
                </button>
            </div>
        }
    </div>
  )
}

export default Sidebar