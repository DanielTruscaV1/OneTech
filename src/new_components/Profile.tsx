import styles from "../new_styles/ProfileStyle.module.css"
import EditProfile from "./EditProfile"
import Sidebar from "./Sidebar"
import Top from "./Top"

const Profile = () => {
  return (
    <div className={styles.profile}>
        <Sidebar/>
        <Top/>
        <EditProfile/>
        <img 
            src="/home_user_3.png"
            className={styles.image}
        />
        <div className={styles.info}>
            <h1 className="text-2xl mb-4">
                Ezreal
            </h1>
            <h1 className="text-orange-400 font-semibold">
                <img className="inline-block w-5 mr-3" src="/crown1.png"/>
                Premium Member
            </h1>
            <div className="w-full">
                <h1 className={styles.status1}>&#9679;</h1>
                <h1 className={styles.status2}>
                    Online
                </h1>
            </div>
        </div>
        <div className={styles.info2}>
            <hr/>
            <p>
            Everybody who loves EXO was freaking out over Ezreal’s voice actor, but Ezreal himself is a golden boy with a lot of simps—or fans. It’s hard to tell the difference, and nobody could blame them. In canon lore, Ezreal is an explorer from Piltover who has great wits. As Heartsteel’s vocalist, he’s described to be more than just a “one-hit wonder.”
            </p>
            <div>
                <button>
                    <img src="/follow1.png"/>
                    Follow
                </button>
                <button>
                    <img src="/chat1.png"/>
                    Chat
                </button>
            </div>
            <h2>
                <img src="/location1.png"/>
                Location: Romania
            </h2>
            <h2>
                <img src="/language1.png"/>
                Language: English, Romanian
            </h2>
            <h2>
                <img src="/sign1.png"/>
                Joined: 26/05/2024
            </h2>
        </div>
    </div>
  )
}

export default Profile