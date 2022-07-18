import { useNavigate,Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged,updateProfile} from "firebase/auth";
import { useEffect, useState } from "react";
import { doc,setDoc } from "firebase/firestore";



function Signup(props) {
  let navigate = useNavigate();
  const db = props.db;  
  const [userName,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [passwordConf,setPasswordConf] = useState('');
  const [success,setSuccess] = useState(false);


  async function handleSubmit(){
    if(userName.length > 2 && passwordConf === password ){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccess(true);
        const user = userCredential.user;
        user.displayName = userName ;
        user.photoURL = 'https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg';
        setDoc(doc(db, "userPfps", user.uid), {
          photoURL: user.photoURL,
          userName : user.displayName
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        setSuccess(false)
      })
      .then(success ? updateProfile(): '')
      .then(navigate("/",{ replace: true }));
      
    }
    else if(userName.length < 3){
      alert('Username must be at least 3 chars.');
    }
    else if(passwordConf !== password){
      alert('Please confirm your password.');
    }
    else{
      alert('Error.Please try again.');
    }
  }

  function updateProfile(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateProfile(auth.currentUser,{displayName:userName, photoURL:'https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'})
      }
    });
  }




    return (
        <div id='signup-page-container'>
        <div id="signup-div">
          <form className='forms' onSubmit={handleSubmit}>
            <input id='fname' type="text" placeholder='Name' onChange={event => setUsername(event.target.value)}></input>
            <input id='fmail' type="email" placeholder='E-mail' onChange={event => setEmail(event.target.value)}></input>
            <input id='fpass' type="password" placeholder='Password' onChange={event => setPassword(event.target.value)}></input>
            <input id='fpassConf' type="password" placeholder='Password Confirmation' onChange={event => setPasswordConf(event.target.value)}></input>
            <button typeof='submit'>Sign Up</button>
          </form>
          <Link to="/login"><p>Click here if you are already a member!</p></Link>
        </div>
      </div>
    );
  }
  
  export default Signup;
  