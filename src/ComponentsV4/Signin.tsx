import { useNavigate } from "react-router-dom";
import styles from "./SigninStyle.module.css"
import { useAuth } from "@/auth";
import { FormEvent, useState } from "react";
import axios from "axios";

const Signin = () => {

    const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if(email != "" && password != "")
    {
      console.log("Sign-in request recived.");
      try{
        const response = await axios.post(
          "https://onetech.onrender.com/api/signin",
          //"http://localhost:3000/api/signin",
          {
            email,
            password,
          },
          {
            headers: {
              'api-key': '',
              // Add other headers if needed
            }
          }
        );

        if(response.status === 201)
        {
            const token = response.data.result.token;
            login(token);
            
            localStorage.setItem("userID", response.data.result.user_id);
            localStorage.setItem("theme", "light");

            navigate(`/profile/${response.data.result.user_id}`);
        }
      }
      catch(error)
      {
        console.log(error);
        alert("Sign-in failed.");
        setEmail("");
        setPassword("");
      }
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.card}>
                <h1>
                    Sign-in to your OneTech account
                </h1>
                <h1>
                    Email
                </h1>
                <input 
                  type="text"
                  onChange={(e : any) => setEmail(e.target.value)}
                />
                <h1>
                    Password
                </h1>
                <input 
                  type="password"
                  onChange={(e : any) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    Submit
                </button>
                <br/>
            </div>
        </div>
    </div>
  )
}

export default Signin