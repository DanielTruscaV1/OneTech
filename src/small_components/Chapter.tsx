import styles from "./ChapterStyle.module.css"

const Chapter = ({chapter} : any) => {
  return (
    <div className={styles.chapter}>
        <img src={chapter.image}/>
        <h1>
            {chapter.title}
        </h1>
    </div>
  )
}

export default Chapter