import OldLeftSidebar from "./OldLeftSidebar"
import RightSideBar from "./RightSideBar"

const Home = () => {
  return (
    <div className="w-screen h-screen relative">
        <OldLeftSidebar/>
        <main className="inline-block w-3/5">

        </main>
        <RightSideBar/>
    </div>
  )
}

export default Home