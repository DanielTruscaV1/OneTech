//@ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from "./ArticleStyle.module.css"
//@ts-ignore
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
//@ts-ignore
import React, { useEffect } from 'react';
import axios from 'axios';

const Article = () => {

  useEffect(() => {
    const getArticle = async () => {
      const response = axios.get("https://onetech.onrender.com/api/getArticles");

      console.log(response);
    }

    getArticle();
  })

  return (
    <div className={styles.container}>
        <div className={styles.body}>

        </div>
    </div>
  )
}

export default Article