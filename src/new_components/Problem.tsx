import styles from "./ProblemStyle.module.css"

const Problem = () => 
{
    return <div className={styles.container}>
        <div className={styles.left}>
            <h1>
                # Problem ID - Problem Name
            </h1>
            <br/>
            <div className={styles.box}>
                Status - Not attempted
            </div>
            <div className={styles.box}>
                Difficulty - Easy
            </div>
            <div className={styles.box}>
                Success rate - 123 / 456 (43%)
            </div>
            <br/>
            <button>
                <img src="/problem2.png"/>
                View problem info
            </button>
            <button>
                <img src="/problem9.png"/>
                Get solutions
            </button>
            <button>
                <img src="/problem10.png"/>
                Post your solution
            </button>
            <div className={styles.content}>
                <h2>
                    Statement
                </h2>
                <p>
                A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

                The path sum of a path is the sum of the node's values in the path.

                Given the root of a binary tree, return the maximum path sum of any non-empty path.
                </p>
            </div>
            <div className={styles.content}>
                <h2>
                    Example 1
                </h2>
                <img src="/example1.jpg" className={styles.example_image}/>
                <p>
                    Input: root = [1,2,3]
                </p>
                <p>
                     Output: 6
                </p>
                <p>
                    Explanation: The optimal path is 2 {"->"} 1 {"->"} 3 with a path sum of 2 + 1 + 3 = 6.
                </p>
            </div>
            <div className={styles.content}>
                <h2>
                    Example 2
                </h2>
                <img src="/example1.jpg" className={styles.example_image}/>
                <p>
                    Input: root = [-10,9,20,null,null,15,7]
                </p>
                <p>
                    Output: 42
                </p>
                <p>
                    Explanation: The optimal path is 15 {"->"} 20 {"->"} 7 with a path sum of 15 + 20 + 7 = 42.
                </p>
            </div>
        </div>
        <div className={styles.right}>
            <button>
                <img src="/problem4.png"/>
                Language - C++
            </button>
            <button>
                <img src="/problem5.png"/>
                Editor Settings
            </button>
            <button style={{float: "right", marginLeft: "1.5vw", marginRight: "0"}}>
                <img src="/problem7.png"/>
                Submit Code
            </button>
            <button style={{float: "right", marginLeft: "1.5vw", marginRight: "0"}}>
                <img src="/problem6.png"/>
                Test Code
            </button>
            <div className={styles.editor}>
                Idk
            </div>
        </div>
    </div>
}

export default Problem;