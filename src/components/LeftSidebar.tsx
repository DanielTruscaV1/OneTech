import { useState } from "react";
import styles from "./LeftSidebarStyle.module.css"

import { useNavigate } from "react-router-dom"

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [isExtended, setIsExtended] = useState(true);

  const addAnimation = () => {
    const container = document.getElementById("left_sidebar_container");
    const toggle = document.getElementById("left_sidebar_toggle");
  
    if (isExtended) {
      container?.classList.remove("slide-right");
      toggle?.classList.remove("rotate-180-cw");
  
      if(toggle) refreshElement(toggle);

      // Remove and re-add the class to re-trigger the animation
      setTimeout(() => {
        container?.classList.add("slide-left");
        toggle?.classList.add("rotate-180-cw");
      }, 10);
    } else {
      container?.classList.remove("slide-left");
      toggle?.classList.remove("rotate-180-cw");
  
      if(toggle) refreshElement(toggle);

      // Remove and re-add the class to re-trigger the animation
      setTimeout(() => {
        container?.classList.add("slide-right");
        toggle?.classList.add("rotate-180-cw");
      }, 10);
    }
  
    setIsExtended(!isExtended);
  };

  const refreshElement = (element: HTMLElement) => {
    const parent = element.parentNode;
    const nextSibling = element.nextSibling;
    if (parent) {
      parent.removeChild(element);
      setTimeout(() => {
        parent.insertBefore(element, nextSibling);
      }, 10); // Timeout ensures that the element is re-added after a brief delay
    }
  };

  return (
    <main id="left_sidebar_container" className={styles.container}>
      <button 
        className={styles.button}
        onClick={() => {navigate('/home')}}
      >
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
      <button 
        id="left_sidebar_toggle"
        className={styles.toggle}
        onClick={addAnimation}
      >
        <img src="/left_sidebar_7.png"/>
      </button>
    </main>
  )
}

export default LeftSidebar