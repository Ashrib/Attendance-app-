import './home.css';
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged, signOut  } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const logoutHandler = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout successful");
            alert("You are successfully logout")
            navigate("/login")
        
        }).catch((error) => {
            // An error happened.
            console.log("signout failed");
        });
    }

    return (
      <div id="login-page">
      home
      <button onClick={logoutHandler}>logout</button>
    </div>
    );
  }
  
  export default Home;
  
