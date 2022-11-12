import './home.css';
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged, signOut  } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    Button, Modal, Typography,Box , AddIcon,
    DeleteIcon , TextField, MenuItem ,FormControl
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import * as React from 'react';
import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, addDoc,
    getDocs,doc, onSnapshot,query,
    serverTimestamp, orderBy, limit, deleteDoc,
    updateDoc,getDoc 
} from "firebase/firestore";
import { useState, useEffect } from 'react';


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
  

  
function Home() {
    
    const [classModal, setClassModal] = useState(false);
    const [studentModal, setStudentModal] = useState(false);
    const [attendanceModal, setAttendanceModal] = useState(false);
    // add class
    const [teacherName, setTeacherName] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [batch, setBatch] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [section, setSection] = useState(null);
    const [timing, setTiming] = useState(null);
    const [classes, setClasses] = useState([]);
    // add student
    const [studentName, setStudentName] = useState(null);
    const [fatherName, setFatherName] = useState(null);
    const [CNIC, setCNIC] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [rollNumber, setRollNumber] = useState(null);
    const [stdCourseName, setStdCourseName] = useState(null);
    const [stdPic, setStdPic] = useState(null);
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    useEffect(() =>{
        const getData = async () => {
          const querySnapshot = await getDocs(collection(db, "classes"));
          querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => `,doc.data());
          setClasses((prev) =>{
            let array = [...prev,doc.data() ]
            return(array)
    
          })
        });
      
        }
        // getData();
        let unsubscribe = null
        const realTimeData = async () =>{
          const q = query(collection(db, "classes"), orderBy("desc"));
          unsubscribe = onSnapshot(q, (querySnapshot) => {
          const getClasses = [];
          querySnapshot.forEach((doc) => {
            getClasses.push({id:doc.id, ...doc.data()});
            console.log(getClasses)
        });
      
        // if (getClasses.length !== 0 ) {
            console.log("classes", getClasses); 
            setClasses(getClasses)
        // }
        });
        }
        realTimeData();
        return () =>{
          console.log("Clean up")
          unsubscribe();
        }
        
      },[])

    //admin logout
    const logoutHandler = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("signout successful");
            navigate("/login")
        
        }).catch((error) => {
            // An error happened.
            alert("signout failed");
        });
    }
    
    const createClass = () => {
        setClassModal(true);
    }

    //add class submit
    const addClass = async(e) => {
        e.preventDefault();
        if(
            courseName && section && schedule && teacherName && batch && timing  
            !== null
            ) {
            try {
                const docRef = await addDoc(collection(db, "classes"),{
                  class: courseName,
                  section : section,
                  schedule : schedule,
                  teacher : teacherName,
                  batch :batch,
                  classTiming : timing
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
                alert("Error adding document: ", e);
              }
              setTeacherName(null);
              setCourseName(null);
              setBatch(null);
              setSchedule(null);
              setSection(null);
              setTiming(null);

              setClassModal(false);
            }
            else{
                alert("Fill out All fields First")
            }

    }

    const addStudentModal = () => {
        setStudentModal(true);
    }
    const addStudent = async(e) => {
        e.preventDefault();
        console.log(stdPic)
        if(
            studentName && fatherName && stdCourseName && 
            CNIC && contactNumber && rollNumber && stdPic 
            !== null
            ) {
                
            try {
                const docRef = await addDoc(collection(db, "students"),{
                  stdName: studentName,
                  fatherName : fatherName,
                  courseName : stdCourseName,
                  cnic  : CNIC,
                  contact :contactNumber,
                  rollNumber : rollNumber,
                  picture : stdPic
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              
              setStudentName(null);
              setFatherName(null);
              setCNIC(null);
              setContactNumber(null);
              setRollNumber(null);
              setStdCourseName(null);
              setStdPic(null);

              setClassModal(false);
            }
            else{
                alert("Fill out All fields First")
            }

    }
    // attendance
    const attendanceModalHandler = () => {
        setAttendanceModal(true);
    }
    return (
      <div id="home-page">
        <nav>
            <span className='home'>Home</span>
            <div className='left-div'>
            <ul>
                <li>
                    <Button variant="outlined" onClick={createClass}>Create Class</Button>
                </li>
                <li>
                    <Button variant="outlined" onClick={addStudentModal}>Add student</Button>
                </li>
                <li>
                    <Button variant="outlined" onClick={attendanceModalHandler}>Mark Attendance</Button>
                </li>
            </ul>
            <Button variant="contained" onClick={logoutHandler}>
                logout
            </Button>;
            </div>
        </nav>
        {
            (classModal)?
            <div className='modal'>
                <div id ='modal-box'>
                <div className='modal-head'>
                    <span 
                    onClick={()=>{setClassModal(false)}}
                    >
                    X
                    </span>
                </div>
                <div className='modal-body'>
                    
                    <div className='addclass'>
                        <form onSubmit={addClass}>
                        <TextField label="Teacher's name" color="secondary" focused 
                        onChange={(e)=>{setTeacherName(e.target.value)}}
                        />
                        <TextField label="Section name" color="secondary" focused 
                        onChange={(e)=>{setSection(e.target.value)}}
                        />
                        <TextField label="Course name" color="secondary" focused 
                        onChange={(e)=>{setCourseName(e.target.value)}}
                        />
                        <TextField label="Batch number" color="secondary" focused 
                        onChange={(e)=>{setBatch(e.target.value)}}
                        />
                        <TextField label="Class timing" color="secondary" focused 
                        onChange={(e)=>{setTiming(e.target.value)}}
                        />
                        <TextField label="Schedule of classes" color="secondary" focused 
                        onChange={(e)=>{setSchedule(e.target.value)}}
                        />
                        <Button variant="outlined" type='submit'>Add Class</Button>
                        
                        </form>
                    </div>
                </div>
                </div>
            </div>
            :
            null
        }
        {
            (studentModal)?
            <div className='modal'>
                <div id ='std-modal-box'>
                <div className='modal-head'>
                    <span 
                    onClick={()=>{setStudentModal(false)}}
                    >
                    X
                    </span>
                </div>
                <div className='modal-body'>
                    
                    <div className='addclass'>
                        <form onSubmit={addStudent}>
                        <TextField label="Name name" color="secondary" focused 
                        onChange={(e)=>{setStudentName(e.target.value)}}
                        />
                        <TextField label="Father name" color="secondary" focused 
                        onChange={(e)=>{setFatherName(e.target.value)}}
                        />
                        <TextField label="Roll Number" color="secondary" focused 
                        onChange={(e)=>{setRollNumber(e.target.value)}}
                        />
                        <TextField label="CNIC number" color="secondary" focused 
                        onChange={(e)=>{setCNIC(e.target.value)}}
                        />
                        <TextField label="Course name" color="secondary" focused 
                        onChange={(e)=>{setStdCourseName(e.target.value)}}
                        />
                        <TextField label="Contact Number" color="secondary" focused 
                        onChange={(e)=>{setContactNumber(e.target.value)}}
                        />
                        <input type="file" id='image' onChange={(e) => { setStdPic(e.target.value) }} />
                        <Button variant="outlined" type='submit'>Add Student</Button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            :
            null
        }
        {
            (attendanceModal)?
            <div className='modal'>
                <div id ='std-modal-box'>
                <div className='modal-head'>
                    <span 
                    onClick={()=>{setAttendanceModal(false)}}
                    >
                    X
                    </span>
                </div>
                <div className='modal-body'>
                    
                    <div className='addclass'>
                        <form onSubmit={addStudent}>
                        <input type="number"
                        onChange={(e)=>{setStudentName(e.target.value)}}
                        />
                        
                        
                        <Button variant="outlined" type='submit'>Add Student</Button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            :
            null
        }
        

        <div>

        </div>

        
    </div>
    );
  }
  
  export default Home;
  
