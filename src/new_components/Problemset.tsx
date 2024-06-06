import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from "../new_styles/ProblemsetStyle.module.css";
import ProblemSmall from "../small_components/ProblemSmall";
import Sidebar from "./Sidebar";
import Top from "./Top";
import { getUserData, User } from '../getUser.tsx';

interface Time {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const Problemset = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Time>({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  });

  const containers = useRef<(HTMLDivElement | null)[]>([]);

  // Effect for fetching user data
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUser(userData);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Effect for updating current time
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

  const problemsData = [
    {
      id: "140",
      name: "Word Break II",
      difficulty: "Hard",
      success: "49.4",
      status: "Solved",
      frequency: "2.34",
    },
    {
      id: "141",
      name: "Linked List Cycle",
      difficulty: "Easy",
      success: "50.5",
      status: "Solved",
      frequency: "3.45",
    },
    {
      id: "140",
      name: "Word Break II",
      difficulty: "Hard",
      success: "49.4",
      status: "Solved",
      frequency: "2.34",
    },
    {
      id: "141",
      name: "Linked List Cycle",
      difficulty: "Easy",
      success: "50.5",
      status: "Solved",
      frequency: "3.45",
    },
    {
      id: "140",
      name: "Word Break II",
      difficulty: "Hard",
      success: "49.4",
      status: "Solved",
      frequency: "2.34",
    },
    {
      id: "141",
      name: "Linked List Cycle",
      difficulty: "Easy",
      success: "50.5",
      status: "Solved",
      frequency: "3.45",
    },
  ];

  // Effect for synchronizing scroll containers
  useEffect(() => {
    containers.current = containers.current.slice(0, problemsData.length);
  }, [problemsData]);

  // Callback for synchronizing scroll positions
  const syncScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const source = event.target as HTMLDivElement;
    const scrollTop = source.scrollTop;

    containers.current.forEach(container => {
      if (container && container !== source) {
        container.scrollTop = scrollTop;
      }
    });
  }, []);

  // Avoid conditional rendering of hooks
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      <Sidebar />
      <Top user={user} />
      <div className={styles.daily}>
        <h1>Daily Problem - #D5173</h1>
        <h1>Word Break II</h1>
        <button className={styles.tags}>
          <img src="/problemset3.png" />
          <p>Show Tags</p>
        </button>
        <button className={styles.info}>
          <img src="/info1.png" />
          <p>Show Info</p>
        </button>
      </div>
      <div className={styles.calendar}>
        <p>
          {currentTime.year}-{String(currentTime.month).padStart(2, '0')}-{String(currentTime.day).padStart(2, '0')}{' '}
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
        <img src="/problemset4.png" />
      </div>
      <div className={styles.filter}>
        <h1>Search</h1>
        <input type="text" />
        <img src="/top1.png" width="25px" className="absolute left-8 top-16" />
        <h1>Filter</h1>
        <button>&#x25BC; &nbsp; Difficulty</button>
        <button>&#x25BC; &nbsp; Success</button>
        <button>&#x25BC; &nbsp; Frequency</button>
      </div>
      <div className={styles.parent}>
        <div className={styles.problems}>
          <div
            style={{
              position: "relative",
              width: "60vw",
              height: "7vh",
              backgroundColor: "#F3F3F3",
            }}
            className="problem_small"
          >
            <p className="inline-block w-12 ml-2 mt-3 text-l text-center">ID</p>
            <p className={`${"greater"} ${"inline-block w-48 ml-2 mt-3 text-l text-center"}`}>Title</p>
            <p className="inline-block w-12 ml-4 mt-3 text-l text-center">Difficulty</p>
            <p className="inline-block w-24 ml-4 pl-4 mt-3 text-l text-center">Success</p>
            <p className="inline-block w-24 ml-4 mt-3 text-l text-center">Status</p>
            <p className="inline-block w-24 ml-4 mt-3 text-l text-center">Frequency</p>
          </div>
          {problemsData.map((problem, index) => (
            <div key={index} onScroll={syncScroll} ref={(ref) => (containers.current[index] = ref)}>
              <ProblemSmall problem={problem} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problemset;
