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
        </div>
    </div>
  )
}

export default Settings