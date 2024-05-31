import styles from "./UserComment.module.css"

const UserComment = ({ user, content } : {
  user : {
    image: string;
    name: string;
    email: string;
  },
  content : {
    text: string;
    tags: string;
  }
}) => {
  return (
    <div className={styles.comment}>
      <hr/>
      <img 
        src={ user.image } 
      />
      <p>
        { content.text } 
      </p>
      <h6>
        { content.tags }
      </h6>
    </div>
  )
}

export default UserComment