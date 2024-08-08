import styles from "./HeaderStyle.module.css";

import axios from "axios";

import { useState, useEffect } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth";

const Header = () => {
    const navigate = useNavigate();

    const  global_user_id  = JSON.parse(localStorage.getItem("user") as string).user_id;

    const [user, setUser] = useState<any>();

    const [loading, setLoading] = useState<boolean>(true);

    const menu = localStorage.getItem("page");
    const [list, setList] = useState<boolean>(false);
    const [list2, setList2] = useState<boolean>(false);

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

      }
      else 
      {
          localStorage.setItem("theme", "light");
          document.documentElement.style.setProperty('--color1', "white");
          document.documentElement.style.setProperty('--color2', "rgb(245, 245, 245)");
          document.documentElement.style.setProperty('--color3', "rgb(235, 235, 235)");
          document.documentElement.style.setProperty('--color4', "rgb(100, 100, 100)");
          document.documentElement.style.setProperty('--color5', "black");

      }
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
          const userData = await axios.get(
            `https://onetech.onrender.com/api/users/${global_user_id}`
          ) as any;

          if (userData) {
            setUser(userData.data);
            localStorage.setItem("user", JSON.stringify(userData.data));

            setLoading(false);
          } 
        };
      
        fetchUserInfo();

        handleTheme();
      }, []);

      const {logout} = useAuth();

     if(loading)
        return <>Loading...</>

    return (
        <div className={styles.container}>
            { 
              !list &&
              <h1 
                className={styles.title}
                onClick={() => setList(true)}
              >
                  { menu == "0" && "OneTech"}
                  { menu == "1" && "Home"}
                  { menu == "2" && "Theory"}
                  { menu == "3" && "Problemset"}
                  { menu == "4" && "Legal Terms"}
                  { menu == "5" && "Profile"}
                  { menu == "6" && "Create"}
                  { menu == "7" && "Settings"}
              </h1>
            }
            {
              list &&
              <div className={styles.list}>
                <h1 onClick={() => {setList(false); localStorage.setItem("page", "0"); navigate('/landing');}}>
                  OneTech
                </h1>
                <h1 onClick={() => {setList(false); localStorage.setItem("page", "1"); navigate('/home');}}>
                  Home
                </h1>
                <h1 onClick={() => {setList(false); localStorage.setItem("page", "2"); navigate('/theory')}}>
                  Theory
                </h1>
                <h1 onClick={() => {setList(false); localStorage.setItem("page", "3"); navigate('/problemset')}}>
                  Problemset
                </h1>
                <h1 onClick={() => {setList(false); localStorage.setItem("page", "4"); navigate('/terms')}}>
                  Legal Terms
                </h1>
                <h1 onClick={() => {setList(false); localStorage.setItem("page", "5"); navigate('/terms')}}>
                  Profile
                </h1>
              </div>
            }

            <Avatar 
              className={styles.avatar} 
              onClick={() => {setList2(true);}}
            >
            <AvatarImage 
                src={user.image} 
                alt="@shadcn" 
            />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>   

            {
              list2 &&
              <div className={styles.list2}>
                <h1 onClick={() => {setList2(false); localStorage.setItem("page", "5"); navigate(`/profile/${global_user_id}`);}}>
                  Profile
                </h1>
                <h1 onClick={() => {setList2(false); localStorage.setItem("page", "6"); navigate('/create_post');}}>
                  Create
                </h1>
                <h1 onClick={() => {setList2(false); localStorage.setItem("page", "7"); navigate('/settings')}}>
                  Settings
                </h1>
                <h1 onClick={() => {logout(); setList2(false); localStorage.setItem("page", "8"); navigate('/sign-in')}}>
                  Sign-out
                </h1>
              </div>
            }
        </div>
    )
}

export default Header