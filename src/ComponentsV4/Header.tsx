import styles from "./HeaderStyle.module.css";

import axios from "axios";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const Header = () => {
    const { global_user_id } = useParams();

    const [user, setUser] = useState<any>();

    const [loading, setLoading] = useState<boolean>(true);

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
            <h1 className={styles.title}>
                OneTech
            </h1>

            <Avatar className={styles.avatar}>
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