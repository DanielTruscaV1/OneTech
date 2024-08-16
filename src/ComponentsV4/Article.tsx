//@ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from "./ArticleStyle.module.css"
//@ts-ignore
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
//@ts-ignore
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get("https://onetech.onrender.com/api/getArticles");
        const t = article_id as any;
        const fetchedArticle = response.data.result.data[t];

        // Ensure that content exists before setting the article state
        if (fetchedArticle && fetchedArticle.content) {
          setArticle(fetchedArticle);
        } else {
          console.error('Article content is missing or undefined');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    getArticle();
  }, [article_id]);

  // Function to parse HTML string into React components
  const renderContent = (content: string) => {
    return content.split(/(?=<)|(?<=>)/g).map((fragment, index) => {
      if (fragment.startsWith('<h1>')) {
        return <h1 key={index} className={styles.title}>{fragment.replace(/<\/?h1>/g, '')}</h1>;
      }
      if (fragment.startsWith('<h2>')) {
        return <h2 key={index} className={styles.subtitle}>{fragment.replace(/<\/?h2>/g, '')}</h2>;
      }
      if (fragment.startsWith('<p>')) {
        return <p key={index} className={styles.paragraph}>{fragment.replace(/<\/?p>/g, '')}</p>;
      }
      if (fragment.startsWith('<SyntaxHighlighter')) {
        // Extract the code inside the SyntaxHighlighter tags
        const code = fragment.match(/<SyntaxHighlighter[^>]*>([\s\S]*?)<\/SyntaxHighlighter>/)?.[1];
        
        if (typeof code === 'string') {
          return (
            <SyntaxHighlighter key={index} className={styles.code} language="cpp" style={dracula}>
              {code.trim()}
            </SyntaxHighlighter>
          );
        } else {
          console.warn('Invalid code content detected:', code);
          return null;
        }
      }
      return null;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {article && article.content && renderContent(article.content)}
      </div>
    </div>
  );
}

export default Article;
