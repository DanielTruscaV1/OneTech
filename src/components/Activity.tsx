import styles from "./ActivityStyle.module.css"

const Activity = () => {
    const daysInYear = 365;
    const weeksInYear = 53;
    const daysInWeek = 7;
  
    // Create a 2D array for the calendar grid
    const calendar = Array.from({ length: weeksInYear }, () => Array(daysInWeek).fill(null));
    
    const contributions = Array.from({ length: daysInYear }, () => ({
        level: Math.floor(Math.random() * 5) // Levels 0 to 4
      }));

    console.log(calendar);

    contributions.forEach((contribution, index) => {
      const week = Math.floor(index / daysInWeek);
      const day = index % daysInWeek;
      calendar[week][day] = contribution;
    });

  return (
    <div className={styles.container}>
        <h1 className="pl-4 pt-4 text-xl">
            Activity - 2024
        </h1>
        <div className={`${styles['calendar-grid']}`}>
        {calendar.flat().map((contribution, index) => (
          <div
            key={index}
            className={`${styles['calendar-day']} ${
              contribution ? styles[`level-${contribution.level}`] : ''
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Activity