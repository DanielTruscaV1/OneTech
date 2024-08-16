import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from "./ArticleStyle.module.css";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Article = () => {
  const { article_id } = useParams<{ article_id: string }>();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get("https://onetech.onrender.com/api/getArticles");
        const id = Number(article_id);
        if (isNaN(id)) {
          console.error('Invalid article ID');
          return;
        }
        const fetchedArticle = response.data.result.data[id];
        if (fetchedArticle && fetchedArticle.data.content) {
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

  const renderContent = (content: string) => {
    const elements: JSX.Element[] = [];
    const regex = /(<h1[^>]*>[\s\S]*?<\/h1>)|(<h2[^>]*>[\s\S]*?<\/h2>)|(<p[^>]*>[\s\S]*?<\/p>)|(<SyntaxHighlighter[^>]*>[\s\S]*?<\/SyntaxHighlighter>)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(content)) !== null) {
      // Add text between matched elements
      if (match.index > lastIndex) {
        elements.push(
          <div key={lastIndex} dangerouslySetInnerHTML={{ __html: content.substring(lastIndex, match.index) }} />
        );
      }

      // Process the matched HTML tag
      const [fullMatch] = match;
      if (fullMatch.startsWith('<h1>')) {
        elements.push(<h1 key={match.index} className={styles.title} dangerouslySetInnerHTML={{ __html: fullMatch.replace(/<\/?h1>/g, '') }} />);
      } else if (fullMatch.startsWith('<h2>')) {
        elements.push(<h2 key={match.index} className={styles.subtitle} dangerouslySetInnerHTML={{ __html: fullMatch.replace(/<\/?h2>/g, '') }} />);
      } else if (fullMatch.startsWith('<p>')) {
        elements.push(<p key={match.index} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: fullMatch.replace(/<\/?p>/g, '') }} />);
      } else if (fullMatch.startsWith('<SyntaxHighlighter')) {
        const codeMatch = fullMatch.match(/<SyntaxHighlighter[^>]*>([\s\S]*?)<\/SyntaxHighlighter>/);
        if (codeMatch && codeMatch[1]) {
          elements.push(
            <SyntaxHighlighter key={match.index} className={styles.code} language="cpp" style={dracula}>
              {codeMatch[1].trim()}
            </SyntaxHighlighter>
          );
        } else {
          console.warn('Invalid code content detected:', fullMatch);
        }
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text after the last matched element
    if (lastIndex < content.length) {
      elements.push(
        <div key={lastIndex} dangerouslySetInnerHTML={{ __html: content.substring(lastIndex) }} />
      );
    }

    return elements;
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {article && article.data.content && renderContent(article.data.content)}
      </div>
    </div>
  );
}

export default Article;
