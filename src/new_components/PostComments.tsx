import styles from "../new_styles/PostCommentsStyle.module.css";

const PostComments = () => {
  return (
    <div className={styles.comments}>
        <hr/>
        <br/>
        <img src="/user1.png"/>
        <h2>
            Ezreal
        </h2>
        <div className={styles.container}>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in nisi quis turpis ultricies fermentum. Nullam scelerisque dictum augue, sed tempus libero tincidunt nec. Nulla facilisi. Vivamus non purus nec nulla scelerisque sodales. Praesent et sem eget nulla dapibus posuere. Fusce id ante quis dolor posuere eleifend. Integer quis lacus vel est tempor gravida. Sed at dui a orci malesuada gravida sit amet ac nisi. Quisque ut leo nunc.
            </p>
            <h3>
                5 minutes ago
            </h3>
        </div>
    </div>
  )
}

export default PostComments