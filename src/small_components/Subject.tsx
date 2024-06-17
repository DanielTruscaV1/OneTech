import Chapter from "./Chapter"
import styles from "./SubjectStyle.module.css"

const Subject = () => {
    const chapter = {
        image: "https://imagedelivery.net/maTmUOtE_OG9P8IykvHTIA/76d1785f-50ba-433f-7825-5eb26f0fff00/public",
        title: "Arrays"
    }

  return (
    <div className={styles.subject}>
        <Chapter chapter={chapter}/>
        <Chapter chapter={chapter}/>
    </div>
  )
}

export default Subject