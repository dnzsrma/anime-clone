import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import { doc,setDoc } from "firebase/firestore";


function Login(props) {
  const db = props.db; 
  let navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  

  async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    setDoc(doc(db, "userPfps", getAuth().currentUser.uid), {
      photoURL: getAuth().currentUser.photoURL,
      userName : getAuth().currentUser.displayName
    });
    navigate("/",{ replace: true });
  }
  function signInWithEmail(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/",{ replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

    return (
      <div id='login-page-container'>
        <div id="login-div">
          <form onSubmit={signInWithEmail}>
            <input id='fmail-login' type="email" placeholder='E-mail' onChange={event => setEmail(event.target.value)}></input>
            <input id='fPass-login' type="password" placeholder='Password' onChange={event => setPassword(event.target.value)}></input>
            <button typeof='submit'>Log In</button>
          </form>
          <button onClick={signIn}>Log in with google</button>
          <Link to="/signup"><p>Click here to sign up!</p></Link>
        </div>
      </div>
    );
  }
  
  export default Login;
  