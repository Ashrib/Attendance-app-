import './login.css';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Link,useNavigate,Navigate} from "react-router-dom"
import { initializeApp } from "firebase/app";
import {
   getFirestore,  collection, getDocs,
   doc, onSnapshot, getDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB82o1wYdcyXnKqOx4KzGtoS5rYpgQ1yzQ",
  authDomain: "attendance-app-b87b4.firebaseapp.com",
  projectId: "attendance-app-b87b4",
  storageBucket: "attendance-app-b87b4.appspot.com",
  messagingSenderId: "538303072662",
  appId: "1:538303072662:web:474f19e4071359b99c35b7",
  measurementId: "G-B33V6JBR7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


function LogIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate()

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)


    const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("login successful: ", user);
                let path = `newPath`; 
                alert("Welcome " + auth?.currentUser?.displayName)
                navigate("/")
                // window.location.reload();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("firebase login error: ", errorCode, errorMessage);
            });




    
  }


  return (
    <div id="login-page">
    <div id="login-container">
    <div id="login-header">
    <span className='login-title'>Admin LogIn</span>
    </div>
    <div id="login-inputs-box">
      <form onSubmit={loginSubmitHandler}>
      <div className='input-col'>
        <input type="email" name='username'
        placeholder="Enter your email" className="email-inp inp-field" 
        onChange={ (e) => {setEmail(e.target.value)} }
        />
      </div>
      <div className='input-col'>
        <input type="password" name='current-password'
        placeholder="Enter your password" className="password-inp inp-field" 
        onChange={ (e) => {setPassword(e.target.value)} }
        />
      </div>
      <button type="submit" id='login-btn'>Log In</button>
      </form>
    </div>
  </div>
  </div>
  );
}

export default LogIn;
