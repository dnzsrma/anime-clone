import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Detail from "./Components/Animedetail";
import Profile from "./Components/Profile";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDo2qk90YG4K_2C1Bslj3CdSKgSfoLsJgY",
  authDomain: "animeclone-1aaa.firebaseapp.com",
  projectId: "animeclone-1aaa",
  storageBucket: "animeclone-1aaa.appspot.com",
  messagingSenderId: "852909164952",
  appId: "1:852909164952:web:bc949c170c84d15be983ed",
  measurementId: "G-6F5TDPRWW3"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage db={db}/>} />
        <Route path="/login" element={<Login db={db}/>} />
        <Route path="/signup" element={<Signup db={db}/>} />
        <Route path="/animes/:id" element={<Detail db={db}/>}></Route>
        <Route path="/profile/:id" element={<Profile db={db}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
