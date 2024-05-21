import styles from "./FooterStyle.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
        <p className={styles.copyright}>
             2024 OneTech
        </p>
        <p className={styles.terms}>
            Terms & Conditions
        </p>
    </div>
  )
}

export default Footer