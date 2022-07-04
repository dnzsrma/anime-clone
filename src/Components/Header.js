import { Link } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from "react";

function Header() {
  const [user,setUser] =  useState(false);
  const [uid,setUid] = useState('');
  const [pfp,setPfp] = useState('');

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.photoURL != null){
          setPfp(user.photoURL);
        }
        setUser(true);
        setUid(user.uid);
      } else {
        setUser(false);
        setUid('');
      }
    });
  });

  function signOutUser() {
    signOut(getAuth());
  }
    return (
      <div id="Header">
        <Link to="/"><div id="Header-Logo">Anime Site Clone</div></Link>
            {user === false &&
              <div id="Header-Buttons">
                <Link to="/login"><button>Log In!</button></Link>
                <Link to="/signup"><button>Sign Up!</button></Link>
              </div>
            }
            {user === true &&
              <div id="Header-Buttons">
                <Link to={{pathname:`/profile/${uid}`}}><img alt="Profile" style={{height:"5vh",width:"auto"}} src={pfp}></img></Link>
                <button onClick={signOutUser} >Sign Out</button>
              </div>
            }

      </div>
    );
  }
  
  export default Header;
  