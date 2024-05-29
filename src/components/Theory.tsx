import LeftSidebar from "./LeftSidebar"
import TopSidebar from "./TopSidebar"

import styles from "./TheoryStyle.module.css"
import IDE from "../small_components/IDE"

const Theory = () => {
  return (
    <div className={styles.container}>
        <LeftSidebar/>
        <TopSidebar message="Theory"/>
        <div className={styles.chapters_container}>
            <div className={styles.current_chapter}>
                <h1 className="mt-2 text-2xl text-center">
                    1. Variables
                </h1>
                <p className="mt-1 text-md text-center text-gray-400">
                    30 minutes reading
                </p>
                <p 
                    className="mt-1/2 text-md text-center"
                    style={{ color: "#00ADB5"}}
                >
                    45% completed
                </p>
                <div 
                    className="mt-2 w-1/2 h-4 bg-gray-200 rounded-xl"
                    style={{ marginLeft: "25%"}}
                >
                    <div 
                        className="mt-2 w-1/2 h-4 rounded-xl"
                        style={{ 
                            backgroundColor: "rgb(0,173,181)",
                            background: "linear-gradient(90deg, rgba(0,173,181,1) 0%, rgba(150,255,230,1) 100%)",
                        }}
                    >

                    </div>
                </div>
            </div>
            <p className="absolute ml-6 mt-8 w-32 inline-block text-xl text-center">
                Next
            </p>
            <img 
                src="theory_icon_1.png"
                className="absolute mt-16 w-8 inline-block"
                style={{ marginLeft: "4.5rem" }}
            />
            <div className={styles.next_chapter}>
                <h1 className="mt-2 text-2xl text-center">
                    2. Statements
                </h1>
                <p className="mt-1 text-l text-center text-gray-400">
                    45 minutes reading
                </p>
                <p className="mt-1 text-l text-center text-gray-400">
                    Not Completed
                </p>
                
            </div>
        </div>
        <div className={styles.content}>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
            <h1>
                What is a variable?
            </h1>
            <p>
            Variables are fundamental building blocks in programming. They serve as named storage locations that hold data which can be manipulated during the execution of a program. Here's an overview of key concepts related to variables in programming:
            </p>
        </div>
        <IDE/>
    </div>
  )
}

export default Theory