const ProblemSmall = ({ problem, index } : {
    problem: {
        id: string;
        name: string;
        difficulty: string;
        success: string;
        status: string;
        frequency: string;
    }
    index: number;
}) => {
  return (
    <div
        style={{
            position: "relative",
            width: "60vw",
            height: "7vh",
            backgroundColor: index%2 == 0 ? "#F8F8F8" : "#F3F3F3",
            cursor: "pointer",
        }}
    >
        <p className="inline-block w-24 ml-4 mt-3 text-l">
            # {problem.id}
        </p>
        <p className="inline-block w-64 ml-4 mt-3 text-l">
             {problem.name}
        </p>
        <p 
            className="inline-block w-32 ml-4 mt-3 text-l font-semibold"
            style={{
                color: problem.difficulty === "Easy" 
                ? "#00ADB5"
                : problem.difficulty === "Medium"
                ? "orange"
                : "red"
            }}
        >
             {problem.difficulty}
        </p>
        <p className="inline-block w-24 ml-4 mt-3 text-l">
             {problem.success} %
        </p>
        <p className="inline-block w-24 ml-4 mt-3 text-l">
             {
                problem.status === "Solved" ?
                <div 
                    className="absolute rounded-full"
                    style={{ 
                        top: "0",
                        marginLeft: "0.5vw",
                        marginTop: "1.5vh",
                        width: "2vw",
                        height: "2vw",
                        backgroundColor: "rgb(0,173,181)",
                        background: "linear-gradient(90deg, rgba(0,173,181,1) 0%, rgba(150,255,230,1) 100%)",
                    }}
                >
                    <img 
                        src="/done1.png"
                        width="24px"
                        className="ml-1 mt-1"
                    />
                </div>:
                <div>

                </div>
             } 
        </p>
        <p className="inline-block w-24 ml-4 mt-3 text-l">
             {problem.frequency} %
        </p>
        <p className="inline-block w-4 ml-4 mt-3 text-l">
             <img 
                src="/link1.png"
                width="26px"
                className="relative top-1"
            />
        </p>
    </div>
  )
}

export default ProblemSmall