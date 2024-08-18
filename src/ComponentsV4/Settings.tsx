import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import styles from "./SettingsStyle.module.css";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-monokai";
import UpdateProfileDialog from "./UpdateProfileDialog";
import axios from "axios";

// Define Profile type
type Profile = {
    username: string;
    email: string;
    description: string;
    image: string;
};

type CustomTheme = 'light' | 'dark';

const Settings = () => {
    const [currentTheme, setCurrentTheme] = useState<string>(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        // Apply theme styles based on local storage value
        handleTheme();
    }, []);

    const handleTheme = () => {
        if (currentTheme === "dark") {
            localStorage.setItem("theme", "dark");
            document.documentElement.style.setProperty('--color1', "rgb(50, 50, 50)");
            document.documentElement.style.setProperty('--color2', "rgb(70, 70, 70)");
            document.documentElement.style.setProperty('--color3', "rgb(100, 100, 100)");
            document.documentElement.style.setProperty('--color4', "rgb(235, 235, 235)");
            document.documentElement.style.setProperty('--color5', "white");
        } else {
            localStorage.setItem("theme", "light");
            document.documentElement.style.setProperty('--color1', "white");
            document.documentElement.style.setProperty('--color2', "rgb(245, 245, 245)");
            document.documentElement.style.setProperty('--color3', "rgb(235, 235, 235)");
            document.documentElement.style.setProperty('--color4', "rgb(100, 100, 100)");
            document.documentElement.style.setProperty('--color5', "black");
        }
    };

    const user = JSON.parse(localStorage.getItem("user") as string);
    
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile>({
        username: user.username,
        email: user.email,
        description: user.description,
        image: user.image // Example placeholder image
    });

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const user_id = localStorage.getItem("userID");

    const handleSaveProfile = useCallback(async (updatedProfile: Profile) => {
        setProfile(updatedProfile);

        const response = await axios.patch(`https://onetech.onrender.com/api/updateUserById/${user_id}`,updatedProfile);
        
        console.log(response);
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <div className={styles.card}>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={currentTheme === "dark"}
                            onChange={() => {
                                setCurrentTheme(currentTheme === "light" ? "dark" : "light");
                                handleTheme();
                            }}
                        />
                        <span className="slider round"></span>
                    </label>
                    <h1>
                        {currentTheme === "light" ? "Dark Mode" : "Light Mode"}
                    </h1>
                </div>
                <div className={styles.card}>
                    <button onClick={handleOpenDialog}>
                        Update Profile
                    </button>
                </div>
                <UpdateProfileDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onSave={handleSaveProfile}
                    initialProfile={profile}
                    theme={currentTheme as CustomTheme} // Pass current theme to dialog
                />
            </div>
        </div>
    );
};

export default Settings;
