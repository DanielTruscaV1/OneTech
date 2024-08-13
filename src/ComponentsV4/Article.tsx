import styles from "./ArticleStyle.module.css"

const Article = () => {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <h1 className={styles.title}>
                Dynammic Programming - Introduction
            </h1>
            <p>
            Dynamic programming (DP) is a powerful algorithmic technique used to solve complex problems by breaking them down into simpler subproblems and storing the results of these subproblems to avoid redundant computations. This method is particularly useful in scenarios where a problem can be divided into overlapping subproblems, and it is applicable in various domains such as computer science, operations research, and economics.
            </p>
        </div>
    </div>
  )
}

export default Article