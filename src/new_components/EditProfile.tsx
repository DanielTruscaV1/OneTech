import { useState } from "react"
import styles from "../new_styles/EditProfile.module.css"
import axios from "axios";

interface User {
  user_id: number;
  username: string;
  email: string;
  image: string;
  description: string;
  location: string;
  language: string;
}

interface UserProps {
  user: User | null;
}

const EditProfile: React.FC<UserProps> = ({ user }) => {
  const [mode, setMode] = useState(false);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async () => {
    if(user)
    {
      const response = await axios.put(
        `http://localhost:3000/api/update_user/${user.user_id}`,
        {
          image,
          description,
          location,
          language,
        }
      );

      console.log(response.data);

      alert("Profile updated successfully.");
      
      setMode(false);
    }
  } 

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
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >

          </textarea>
          <h1>
            Location
          </h1>
          <input 
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <h1>
            Language
          </h1>
          <input 
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <button 
            className={styles.submit}
            onClick={handleSubmit}
          >
            <img src="/upload1.png"/>
            Save Changes
          </button>
        </div>
      }
        
    </div>
  )
}

export default EditProfile