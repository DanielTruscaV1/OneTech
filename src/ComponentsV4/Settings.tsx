import { useState, useEffect } from "react";
import Header from "./Header"
import styles from "./SettingsStyle.module.css"

const Settings = () => {

    const handleTheme = () => {
        const theme = localStorage.getItem("theme");
        
        if(theme == "light")
        {
            localStorage.setItem("theme", "dark");
            document.documentElement.style.setProperty('--color1', "rgb(50, 50, 50)");
            document.documentElement.style.setProperty('--color2', "rgb(70, 70, 70)");
            document.documentElement.style.setProperty('--color3', "rgb(100, 100, 100)");
            document.documentElement.style.setProperty('--color4', "rgb(235, 235, 235)");
            document.documentElement.style.setProperty('--color5', "white");
    
            setCurrentTheme("dark");
        }
        else 
        {
            localStorage.setItem("theme", "light");
            document.documentElement.style.setProperty('--color1', "white");
            document.documentElement.style.setProperty('--color2', "rgb(245, 245, 245)");
            document.documentElement.style.setProperty('--color3', "rgb(235, 235, 235)");
            document.documentElement.style.setProperty('--color4', "rgb(100, 100, 100)");
            document.documentElement.style.setProperty('--color5', "black");
    
            setCurrentTheme("light");
        }
      }
    
      const theme = localStorage.getItem("theme");
    
      const [currentTheme, setCurrentTheme] = useState<string>(theme as string);

      useEffect(() => {
        handleTheme();
      }, [])

      const [tab1, setTab1] = useState<boolean>(false);
      const [tab2, setTab2] = useState<boolean>(false);
      const [tab3, setTab3] = useState<boolean>(false);

  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.body}>
            <div className={styles.card}>
                <label className="switch">
                    <input type="checkbox" onClick={handleTheme}/>
                    <span className="slider round"></span>
                </label>
                <h1>
                    {currentTheme === "light" ? "Dark Mode" : "Light Mode"}
                </h1>
            </div>
            <div className={styles.card}>
                <h1>
                    IDE Theme - <span onClick={() => setTab1(true)}>Monokai</span>
                </h1>
                {
                    tab1 && 
                    <div style={{ display:"flex", flexDirection: "column" }}>
                        <div className={styles.list}>
                            <h1 onClick={() => {setTab1(false)}}>
                                Option1
                            </h1>
                            <h1>
                                Option2
                            </h1>
                            <h1>
                                Option3
                            </h1>
                            <h1>
                                Option4
                            </h1>
                            <h1>
                                Option5
                            </h1>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.card}>
                <h1>
                    IDE Font Family - <span onClick={() => setTab2(true)}>Verdana</span>
                </h1>
                {
                    tab2 && 
                    <div style={{ display:"flex", flexDirection: "column" }}>
                        <div className={styles.list}>
                            <h1 onClick={() => {setTab2(false)}}>
                                Option1
                            </h1>
                            <h1>
                                Option2
                            </h1>
                            <h1>
                                Option3
                            </h1>
                            <h1>
                                Option4
                            </h1>
                            <h1>
                                Option5
                            </h1>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.card}>
                <h1>
                    IDE Font Size - <span onClick={() => setTab3(true)}>22px</span>
                </h1>
                {
                    tab3 && 
                    <div style={{ display:"flex", flexDirection: "column" }}>
                        <div className={styles.list}>
                            <h1 onClick={() => {setTab3(false)}}>
                                Option1
                            </h1>
                            <h1>
                                Option2
                            </h1>
                            <h1>
                                Option3
                            </h1>
                            <h1>
                                Option4
                            </h1>
                            <h1>
                                Option5
                            </h1>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Settings