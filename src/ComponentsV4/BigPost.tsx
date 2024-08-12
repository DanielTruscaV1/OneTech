import styles from "./BigPostStyle.module.css"

const BigPost = ({ post, user, setShowPost } : {post: any, user: any, setShowPost: any}) => {

    function timeAgo(postDate: string): string {
        const now: Date = new Date();
        const postCreationDate: Date = new Date(postDate);
        const secondsAgo: number = Math.floor((now.getTime() - postCreationDate.getTime()) / 1000);
      
        const intervals: { label: string, seconds: number }[] = [
          { label: 'year', seconds: 31536000 },
          { label: 'month', seconds: 2592000 },
          { label: 'day', seconds: 86400 },
          { label: 'hour', seconds: 3600 },
          { label: 'minute', seconds: 60 },
          { label: 'second', seconds: 1 },
        ];
      
        for (const interval of intervals) {
          const count: number = Math.floor(secondsAgo / interval.seconds);
          if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
          }
        }
      
        return 'just now';
      }

      const isLargeDevice = window.matchMedia("(min-width: 600px)").matches;


  return (
    <div className={styles.container}>
        <div className={styles.body}>
            {
                isLargeDevice &&
                <div className={styles.row}>
                    
                    <img src={user.image} className={styles.author}/>
                    <h1 className={styles.title}>
                        {post.data.title}
                    </h1>
                    <p className={styles.date}>
                        {timeAgo(post.data.date)}
                    </p>
                    <button className={styles.exit} onClick={() => setShowPost(-1)}>
                        Close
                    </button>
                </div>
            }
            {
                !isLargeDevice &&
                <div className={styles.column}>
                    
                    <img src={user.image} className={styles.author}/>
                    <h1 className={styles.title}>
                        {post.data.title}
                    </h1>
                    <p className={styles.date}>
                        {timeAgo(post.data.date)}
                    </p>
                    <button className={styles.exit} onClick={() => setShowPost(-1)}>
                        Close
                    </button>
                </div>
            }
            <img src={post.data.image} className={styles.post_image}/>
            <div className={styles.comments}>
                <h1>
                    Comments
                </h1>
            </div>
        </div>
    </div>
  )
}

export default BigPost