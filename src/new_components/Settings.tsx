import { useState } from "react";
import { useAuth } from "../auth";
import styles from "./SettingsStyle.module.css"

const Settings = ({setSettings} : {setSettings: any;}) => {

  const handleTheme = () => {
    const theme = localStorage.getItem("theme");
    
    if(theme == "light")
    {
        localStorage.setItem("theme", "dark");
        document.documentElement.style.setProperty('--color1', "#222831");
        document.documentElement.style.setProperty('--color2', "#393E46");
        document.documentElement.style.setProperty('--color3', "#00ADB5");
        document.documentElement.style.setProperty('--color4', "#00ADB5");
        document.documentElement.style.setProperty('--color5', "#EEEEEE");

        setCurrentTheme("dark");
    }
    else 
    {
        localStorage.setItem("theme", "light");
        document.documentElement.style.setProperty('--color1', "white");
        document.documentElement.style.setProperty('--color2', "#E6F0FF");
        document.documentElement.style.setProperty('--color3', "#0047FF");
        document.documentElement.style.setProperty('--color4', "rgba(0, 71, 255, 0.3)");
        document.documentElement.style.setProperty('--color5', "black");

        setCurrentTheme("light");
    }
  }

  const {logout} = useAuth();

  const handleSignOut = () => {
    localStorage.setItem("theme", "light");
    window.location.reload();
    logout();
  }

  const theme = localStorage.getItem("theme");

  const [currentTheme, setCurrentTheme] = useState<string>(theme as string);

  return (
    <div className={styles.container}>
        <h1>
            Settings
        </h1>
        <img 
            src={theme == "light" ? '/close.png': "/close2.png"}
            alt="Close"
            onClick={() => setSettings(false)}
        />
        <br/>
        <button onClick={handleTheme}>
          {
            currentTheme === "light" ? "Dark mode" : "Light mode"
          }
        </button>
        <button onClick={handleSignOut}>
            Sign-out
        </button>
    </div>
  )
}

export default Settings