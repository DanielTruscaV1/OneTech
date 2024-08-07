import axios from "axios";
import styles from "./CreatePostStyle.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const CreatePost = () => {
    const user_id = localStorage.getItem("userID");

    const [image, setImage] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [tags, setTags] = useState<string>();

    const navigate = useNavigate();

    const createPost = async () => {
        try 
        {
            const response = await axios.post(
                `https://onetech.onrender.com/api/createPost/${user_id}`,
                //`http://localhost:3000/api/createPost/${user_id}`,
                {
                    image,
                    title,
                    description,
                    tags,
                }
            );

            if(response)
                navigate(`/profile/${user_id}`);
        }
        catch(error)
        {
            console.log("Front-end error: ", error);
        }
    }

  return (
    <div className={styles.container}>
        <Header/>   
        <div className={styles.create_post}>
        <h1>
            Create a new post
        </h1>
        <h1>
            Image Link
        </h1>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
        <h1>
            Title
        </h1>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <h1>
            Description
        </h1>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <h1>
            Tags
        </h1>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}/>
        <br/>
        <button onClick={createPost}>
            Submit
        </button>
        <br/>
    </div>
    </div>
    
  )
}

export default CreatePost