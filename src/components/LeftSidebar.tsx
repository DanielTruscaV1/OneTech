import { useState } from "react";
import styles from "./LeftSidebarStyle.module.css"

import { useNavigate } from "react-router-dom"

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [isExtended, setIsExtended] = useState(true);

  // @ts-ignore: TS6133
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
      ></button>
      <button 
        className={styles.button}
        onClick={() => {navigate('/home')}}
      >
        <img src="/nav11.png"/>
      </button>
      <button 
        className={styles.button} 
        onClick={() => {navigate('/theory')}}
      >
        <img src="/nav22.png"/>
      </button>
      <button 
        className={styles.button} 
        onClick={() => {navigate('/problemset')}}
      >
        <img 
          src="/nav33.png"
          style={{scale: "120%"}}
        />
      </button>
      <button 
        className={styles.button} 
        onClick={() => {navigate('/contests')}}
      >
        <img src="/nav4.png"/>
      </button>
      <button 
        className={styles.button}
        onClick={() => {navigate('/rankings')}}
      >
        <img src="/nav5.png"/>
      </button>
      <button 
        className={styles.button}
        onClick={() => {navigate('/user-profile')}}
      >
        <img src="/nav6.png"/>
      </button>
      <button 
        className={styles.button}
        onClick={() => {navigate('/terms')}}
      >
        <img src="/nav77.png"/>
      </button>

      <div className={styles.theme}>
        <img 
          src="/nav88.png"
          width="28px" 
          height="28px" 
          className="inline-block ml-2"
        />
        <img 
          src="/nav99.png"
          width="20px" 
          height="20px" 
          className="inline-block float-right ml-1 mt-1"
        />
        <div className="ml-4 mt-2 w-14 h-4 bg-gray-300 rounded">
          <div className="w-4 h-4 bg-gray-400 rounded-3xl cursor-pointer">

          </div>
        </div>
      </div>
    </main>
  )
}

export default LeftSidebar