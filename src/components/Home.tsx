import Footer from "./Footer"
import LeftSidebar from "./LeftSidebar"
import TopSidebar from "./TopSidebar"

import styles from "./HomeStyle.module.css";
import { useEffect, useState } from "react";

interface Document {
  data: {
    author: string;
    title: string;
    tags: string[];
  }
}

import axios from "axios";
import CreatePost from "./CreatePost";

const Home = () => {
  const [posts, setPosts] = useState<Document[] | null>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts`);
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, []);

  return (
    <div>
      <LeftSidebar/>
      {
        edit && <CreatePost setEdit={setEdit}/>
      }
      <div className={styles.container}>
        <h1 className={styles.header}>
          My Feed
        </h1>
        <button className={styles.create} onClick={() => setEdit(true)}>
          <img width="60px" height="60px" src="/home1.png"/>
        </button>
        <br/>
        <br/>
        <br/>
        { posts && posts.map((p) => (
            <div className={styles.post}>
              <h1 className="pl-2 pt-2 text-xl">
                {p.data.title}
              </h1>
              <img src="/logo2.png"/>
              <div className={styles.user}>
                UN
              </div>
              
              <div className={styles.tags_container}>
                {
                  p.data.tags.map((t) => (
                    <p className={styles.tag}>
                      #{t}                    
                    </p>
                  ))
                }
                
              </div>
              <div className={styles.interact}>
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              <svg width="35px" height="35px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.38204 10.234C7.96783 10.234 7.63204 10.5698 7.63204 10.984C7.63204 11.3982 7.96783 11.734 8.38204 11.734V10.234ZM14.147 11.734C14.5613 11.734 14.897 11.3982 14.897 10.984C14.897 10.5698 14.5613 10.234 14.147 10.234V11.734ZM9.10004 12.342C8.68583 12.342 8.35004 12.6778 8.35004 13.092C8.35004 13.5062 8.68583 13.842 9.10004 13.842V12.342ZM13.426 13.842C13.8403 13.842 14.176 13.5062 14.176 13.092C14.176 12.6778 13.8403 12.342 13.426 12.342V13.842ZM7.89534 6.77227C7.4868 6.84059 7.211 7.22716 7.27932 7.6357C7.34764 8.04424 7.73421 8.32005 8.14275 8.25173L7.89534 6.77227ZM8.51904 7.471L8.5175 8.221H8.51904V7.471ZM14.019 7.471L14.0247 6.721H14.019V7.471ZM17.035 10.532L16.285 10.5265V10.532H17.035ZM17.035 14.248L16.285 14.248L16.285 14.2489L17.035 14.248ZM16.2486 14.666C16.1762 15.0739 16.4482 15.4631 16.8561 15.5355C17.2639 15.6078 17.6532 15.3358 17.7255 14.928L16.2486 14.666ZM8.1494 8.25058C8.55731 8.17859 8.82962 7.78955 8.75763 7.38164C8.68563 6.97373 8.29659 6.70142 7.88869 6.77342L8.1494 8.25058ZM5.50004 10.531L6.25006 10.531L6.25003 10.527L5.50004 10.531ZM5.50004 19H4.75004C4.75004 19.2663 4.89121 19.5126 5.12096 19.6471C5.35071 19.7817 5.63459 19.7844 5.86683 19.6542L5.50004 19ZM8.51604 17.309V16.559C8.38759 16.559 8.2613 16.592 8.14926 16.6548L8.51604 17.309ZM14.016 17.309V18.059L14.021 18.059L14.016 17.309ZM17.7199 14.9289C17.7911 14.5209 17.518 14.1324 17.11 14.0612C16.7019 13.99 16.3134 14.263 16.2422 14.6711L17.7199 14.9289ZM7.28008 7.38379C7.20928 7.79191 7.48272 8.18016 7.89084 8.25096C8.29896 8.32177 8.6872 8.04832 8.75801 7.64021L7.28008 7.38379ZM10.987 5V4.24999L10.9827 4.25001L10.987 5ZM16.487 5L16.4934 4.25H16.487V5ZM19.5 8.061L18.75 8.05554V8.061H19.5ZM19.5 11.777H18.75L18.7501 11.782L19.5 11.777ZM16.8507 14.0614C16.4428 14.1334 16.1705 14.5224 16.2425 14.9304C16.3145 15.3383 16.7035 15.6106 17.1114 15.5386L16.8507 14.0614ZM8.38204 11.734H14.147V10.234H8.38204V11.734ZM9.10004 13.842H13.426V12.342H9.10004V13.842ZM8.14275 8.25173C8.26659 8.23102 8.39194 8.22074 8.5175 8.221L8.52059 6.721C8.31111 6.72057 8.10196 6.73772 7.89534 6.77227L8.14275 8.25173ZM8.51904 8.221H14.019V6.721H8.51904V8.221ZM14.0134 8.22098C15.2773 8.23051 16.2943 9.26265 16.2851 10.5265L17.785 10.5375C17.8002 8.4453 16.1168 6.7368 14.0247 6.72102L14.0134 8.22098ZM16.285 10.532V14.248H17.785V10.532H16.285ZM16.285 14.2489C16.2852 14.3887 16.273 14.5283 16.2486 14.666L17.7255 14.928C17.7654 14.7032 17.7853 14.4754 17.785 14.2471L16.285 14.2489ZM7.88869 6.77342C6.06575 7.09516 4.74009 8.68395 4.75006 10.535L6.25003 10.527C6.244 9.40676 7.04624 8.44529 8.1494 8.25058L7.88869 6.77342ZM4.75004 10.531V19H6.25004V10.531H4.75004ZM5.86683 19.6542L8.88283 17.9632L8.14926 16.6548L5.13326 18.3458L5.86683 19.6542ZM8.51604 18.059H14.016V16.559H8.51604V18.059ZM14.021 18.059C15.8485 18.047 17.4057 16.7293 17.7199 14.9289L16.2422 14.6711C16.0527 15.757 15.1134 16.5518 14.0111 16.559L14.021 18.059ZM8.75801 7.64021C8.94671 6.55256 9.88748 5.75633 10.9914 5.74999L10.9827 4.25001C9.15263 4.26052 7.59293 5.58059 7.28008 7.38379L8.75801 7.64021ZM10.987 5.75H16.487V4.25H10.987V5.75ZM16.4806 5.74997C17.7437 5.76075 18.7593 6.79252 18.7501 8.05554L20.25 8.06646C20.2652 5.97576 18.5841 4.26786 16.4934 4.25003L16.4806 5.74997ZM18.75 8.061V11.777H20.25V8.061H18.75ZM18.7501 11.782C18.7576 12.9034 17.955 13.8665 16.8507 14.0614L17.1114 15.5386C18.9362 15.2165 20.2624 13.6249 20.25 11.772L18.7501 11.782Z" fill="#ffffff"></path> </g></svg>
              <svg className="float-right" width="35px" height="35px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.734 15.8974L19.22 12.1374C19.3971 11.9927 19.4998 11.7761 19.4998 11.5474C19.4998 11.3187 19.3971 11.1022 19.22 10.9574L14.734 7.19743C14.4947 6.9929 14.1598 6.94275 13.8711 7.06826C13.5824 7.19377 13.3906 7.47295 13.377 7.78743V9.27043C7.079 8.17943 5.5 13.8154 5.5 16.9974C6.961 14.5734 10.747 10.1794 13.377 13.8154V15.3024C13.3888 15.6178 13.5799 15.8987 13.8689 16.0254C14.158 16.1521 14.494 16.1024 14.734 15.8974Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              <svg className="float-right" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </div>
            </div>
        ))
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Home