import styles from "./LeftSidebarStyle.module.css"

import { useNavigate } from "react-router-dom"

const LeftSidebar = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <button className={styles.button}>
        <img src="/left_sidebar_1.png"/>
        Home
      </button>
      <button 
        className={styles.button} 
        onClick={() => {navigate('/problemset')}}
      >
        <img src="/left_sidebar_2.png"/>
        Problemset
      </button>
      <button 
        className={styles.button} 
        onClick={() => {navigate('/arena')}}
      >
        <img src="/left_sidebar_8.png"/>
        Arena
      </button>
      <button 
        className={styles.button} 
        onClick={() => {navigate('/rankings')}}
      >
        <img src="/left_sidebar_9.png"/>
        Rankings
      </button>
      <button 
        className={styles.button}
        onClick={() => {navigate('/user-profile')}}
      >
        <img src="/left_sidebar_3.png"/>
        Profile
      </button>
      <button className={styles.button}>
        <img src="/left_sidebar_4.png"/>
        Account
      </button>
      <button 
        className={styles.button}
        onClick={() => {navigate('/sign-in')}}
      >
        <img src="/left_sidebar_5.png"/>
        Sign-In
      </button>
      <button 
        className={styles.button}
        onClick={() => {navigate('/sign-up')}}
      >
        <img src="/left_sidebar_6.png"/>
        Sign-Up
      </button>
      <button className={styles.toggle}>
        <img src="/left_sidebar_7.png"/>
      </button>
    </main>
  )
}

export default LeftSidebar