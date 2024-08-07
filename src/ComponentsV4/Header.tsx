import styles from "./HeaderStyle.module.css";

import axios from "axios";

import { useState, useEffect } from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const  global_user_id  = JSON.parse(localStorage.getItem("user") as string).user_id;

    const [user, setUser] = useState<any>();

    const [loading, setLoading] = useState<boolean>(true);

    const menu = localStorage.getItem("page");
    const [list, setList] = useState<boolean>(false);

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
      }, []);

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
              onClick={() => {localStorage.setItem("page", "5"); navigate(`/profile/${global_user_id}`)}}
            >
            <AvatarImage 
                src={user.image} 
                alt="@shadcn" 
            />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>   
        </div>
    )
}

export default Header