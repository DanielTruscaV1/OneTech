import styles from "../new_styles/ProblemsetStyle.module.css"

import Sidebar from "./Sidebar"
import Top from "./Top"

import { useState, useEffect } from 'react';

interface Time {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  }

const Problemset = () => {
    const [currentTime, setCurrentTime] = useState<Time>({
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      });
    
      useEffect(() => {
        const updateTime = () => {
          const now = new Date();
          setCurrentTime({
            year: now.getFullYear(),
            month: now.getMonth() + 1, // Months are zero-indexed
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
          });
        };
    
        const timerId = setInterval(updateTime, 1000);
    
        return () => clearInterval(timerId);
      }, []);

      const gridData = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ];

  return (
    <div className={styles.problemset}>
        <Sidebar/>
        <Top/>
        <div className={styles.daily}>
            <h1>
                Daily Problem - #D5173
            </h1>
            <h1>
                Word Break II
            </h1>
            <button className={styles.tags}>
                <img src="/problemset3.png"/>
                <p>
                Show Tags
                </p>
            </button>
            <button className={styles.info}>
                <img src="/info1.png"/>
                <p>
                Show Info
                </p>
            </button>
        </div>
        <div className={styles.calendar}>
            <p>
                {currentTime.year}-{String(currentTime.month).padStart(2, '0')}-{String(currentTime.day).padStart(2, '0')} {' '}
            </p>
            <p>
                {String(currentTime.hour).padStart(2, '0')}:
                {String(currentTime.minute).padStart(2, '0')}:
                {String(currentTime.second).padStart(2, '0')}
            </p>
            <div className={styles.grid}>
                {gridData.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`${styles.cell} ${cell === 1 ? styles.teal : styles.orange}`}></div>
                    ))}
                    </div>
                ))}
            </div>
            <img src="/problemset4.png"/>
        </div>
        <div className={styles.filter}>
            <h1>
                Search
            </h1>
            <input 
                type="text"
            />
            <img 
                src="/top1.png"
                width="25px"
                className="absolute left-8 top-16"
            />
            <h1>
                Filter
            </h1>
            <button>
                &#x25BC;  &nbsp; Difficulty 
            </button>
            <button>
                &#x25BC;  &nbsp; Success 
            </button>
            <button>
                &#x25BC;  &nbsp; Frequency 
            </button>
        </div>
    </div>
  )
}

export default Problemset