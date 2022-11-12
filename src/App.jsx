
import './App.css';
import {Route , Routes, Link, Navigate } from 'react-router-dom';
import LogIn from './components/login/login.jsx';
import Home from './components/home/home.jsx';
import {useState, useEffect} from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  
  useEffect(() => {

    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        console.log("auth change: login", user);
        setIsLogin(true)

      } else {
        console.log("auth change: logout");
        // User is signed out
        setIsLogin(false)

      }
    });

    return () => {
      console.log("Cleanup function called")
      unSubscribe();
    }

  }, [])


  return (
    <div id='body-div'>
      {
        (isLogin)?
        <nav>
        <ul>
          <li >Logout</li>
          <li >Logout</li>
          <li >Logout</li>
        </ul>
        </nav>
        :
        null
      }

      <div id='container'>
      
        {(isLogin) ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        :

        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        // <Routes>
        //     <Route path="/" element={<LogIn />}/>
        //     {/* <Route path="/components/signup/signup" element={<SignUp />} /> */}
        //     <Route path="/components/login/login" element={<LogIn />} />
        //     <Route path="*" element={<Navigate to="/" replace={true} />} />
        // </Routes>
        }
      </div> 
    </div>
  );
}

export default App;
