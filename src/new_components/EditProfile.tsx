import { useState } from "react"
import styles from "../new_styles/EditProfile.module.css"

const EditProfile = () => {
  const [mode, setMode] = useState(false);

  return (
    <div className={styles.edit}>
      {
        !mode ? 
        <button onClick={() => setMode(true)}>
          Edit 
        </button>
        :
        <div className={styles.edit_card}>
          <button onClick={() => setMode(false)}>
            <img src="/nav0.png"/>
          </button>
          <h1 className={styles.title}>
            Edit Your Profile
          </h1>
          <h1>
            Image URL
          </h1>
          <input 
            type="text"
          />
          <h1>
            Username
          </h1>
          <input 
            type="text"
          />
          <h1>
            Description
          </h1>
          <textarea>

          </textarea>
          <h1>
            Location
          </h1>
          <input 
            type="text"
          />
          <h1>
            Language
          </h1>
          <input 
            type="text"
          />
          <button className={styles.submit}>
            <img src="/upload1.png"/>
            Save Changes
          </button>
        </div>
      }
        
    </div>
  )
}

export default EditProfile