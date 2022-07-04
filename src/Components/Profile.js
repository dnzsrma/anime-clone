import { useState , useEffect} from "react";
import { useParams } from "react-router-dom"
import { doc, getDoc, where } from "firebase/firestore";
import { collectionGroup, query, getDocs, orderBy} from "firebase/firestore";
import Post from "./Post";
import Favorite from "./favorite";

function Profile(props) {
    const [userPfp,setUserPfp] = useState('');
    const [userName,setUsername] = useState('');
    const [userFeed,setUserFeed] = useState([]);
    const [userFavs,setUserFavs] = useState([]);
    const [feedType,setFeedType] = useState ('Posts');
    const { id } = useParams();
    const db = props.db;
   

    useEffect(() => {
      fetchUser();
      fetchPosts();
      fetchFavs();
    },[]);

  

    async function fetchUser(){
      const docRef = doc(db, "userPfps", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserPfp(docSnap.data().photoURL);
        setUsername(docSnap.data().userName);
      }
    }
    async function fetchPosts(){
      const userPosts = query(collectionGroup(db, 'posts'),where('posterId','==',id),orderBy('timestamp','desc'));
        const querySnapshot = await getDocs(userPosts);
        querySnapshot.forEach((doc) => {
            setUserFeed(prev => [...prev ,doc.data()]);
        });
    }
    async function fetchFavs(){
      const userFaves = query(collectionGroup(db, 'favorites'),where('userId','==',id),orderBy('timestamp','desc'));
        const querySnapshot = await getDocs(userFaves);
        querySnapshot.forEach((doc) => {
            setUserFavs(prev => [...prev ,doc.data()]);
        });
    }
    function showFavorites(){
      setFeedType('Favs');
    }
    function showPosts(){
      setFeedType('Posts');
    }



    return (
      <div id="profilePage">
        <div id="user-profile">
          <img style={{height:'15vw',width:'auto'}} className="profile-picture" alt="Profile" src={userPfp}></img>
          <h4>{userName}</h4>
          <div id="profile-bar">
            <div onClick={showPosts} className="profile-bar-button">Posts</div>
            <div onClick={showFavorites} className="profile-bar-button">Favorites</div>
          </div>
          <div id="profile-feed">
          { feedType == 'Posts' &&
            userFeed.map((post,i) => 
              <Post key={i} image = {post.userPic} username = {post.username} text = {post.text} />)
          }
          {feedType == 'Favs' &&
            userFavs.map((fav,i) => 
              <Favorite key={i} pic = {fav.animePic} title = {fav.animeName}/>)
          }
          </div>
        </div>
      </div>
    );
  }
  
  export default Profile;
  