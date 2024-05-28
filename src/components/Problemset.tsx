//Import the CSS module file for this specific component
import styles from './ProblemsetStyle.module.css';

//Import the react components
import LeftSidebar from './LeftSidebar';
import TopSidebar from './TopSidebar';



const Problemset = () => {

    const gridData = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ];

  return (
    <div className={styles.container}>
        <LeftSidebar/>
        <TopSidebar message="Problemset"/>
        <div className={styles.daily}>
            <h1 className="inline-block ml-4 mt-2 w-2/3 text-xl">
                Daily Problem - #D5173 - Wordk Break II
            </h1>
            <p className="inline-block mr-4 mt-2 w-58 text-m text-right float-right text-gray-400">
                Time left - 04:19:59
            </p>
            <h1 className="ml-4 mt-2 w-2/3 text-xl">
                Solve the OneTech Daily Problem to earn  50
                <img 
                    src="/problemset2.png"
                    width="25px"
                    height="25px"
                    className='ml-4 inline-block'
                />
            </h1>
            <button className={styles.tags}>
                <img 
                    src="/problemset3.png"
                    width="25px"
                    height="25px"
                    className='mx-2 inline-block'
                />
                Show Tags
            </button>
        </div>
        <div className={styles.calendar}>
            <h1 className="inline-block ml-4 mt-2 w-2/3 text-xl">
                24 May 2024
            </h1>
            <div className={styles.grid}>
                {gridData.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`${styles.cell} ${cell === 1 ? styles.teal : styles.orange}`}></div>
                    ))}
                    </div>
                ))}
            </div>
            <img 
                src="/problemset4.png"
                width="80px"
                height="80px"
                className='absolute top-10 right-4'
            />
        </div>
        <div className={styles.graph}>
                
        </div>
    </div>
  )
}

export default Problemset