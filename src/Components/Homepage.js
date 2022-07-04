import { getAuth,onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Post from "./Post";
import { collectionGroup, collection, query, addDoc, getDocs, serverTimestamp, orderBy} from "firebase/firestore";


function Homepage(props) {
    const db = props.db;
    const [topAnimes,setTopAnimes] = useState([]);
    const [trendingAnimes,setTrendingAnimes] = useState([]);
    const [upcomingAnimes,setUpcomingAnimes] = useState([]);
    const [seasonalAnimes,setSeasonalAnimes] = useState([]);
    const [feedPosts,setFeedPosts] = useState([]);
    const [postsFetched,setPostsFetched] = useState(false);
    const [userPost,setUserPost] = useState('');

    
    useEffect(() => {
        fetchSeasonalAnime();
        fetchUpcomingAnime();
        fetchTopAnime();
        fetchTrendingAnime();
        fetchPosts();
    },[]);

    function fetchTopAnime(){
        fetch('https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=20&page[offset]=0')
        .then(res=> res.json())
        .then(json=> setTopAnimes(json.data));
    }
    function fetchTrendingAnime(){
        fetch('https://kitsu.io/api/edge/trending/anime')
        .then(res=> res.json())
        .then(json=> setTrendingAnimes(json.data));
    }
    function fetchSeasonalAnime(){
        const date = new Date();
        let season = 'winter';
        const year = date.getFullYear();
        const month = date.getMonth();
        if(month >= 2 && month <= 4){
            season = 'spring';
        }
        else if(month >= 5 && month <= 7){
            season = 'summer';
        }
        else if(month >= 8 && month <= 10){
            season = 'fall';
        }
        fetch(`https://kitsu.io/api/edge//anime?filter[seasonYear]=${year}&filter[season]=${season}&sort=-averageRating`)
        .then(res=> res.json())
        .then(json=> setSeasonalAnimes(json.data));
    }
    function fetchUpcomingAnime(){
        fetch(`https://kitsu.io/api/edge//anime?filter[status]=upcoming`)
        .then(res=> res.json())
        .then(json=> setUpcomingAnimes(json.data));
    }
    async function fetchPosts(){
        setFeedPosts([]);
        const allPosts = query(collectionGroup(db, 'posts'),orderBy('timestamp','desc'));
        const querySnapshot = await getDocs(allPosts);
        querySnapshot.forEach((doc) => {
            setFeedPosts(prev => [...prev ,doc.data()]);
        });
        setPostsFetched(true);
    }
    function handleTextChange(e){
        if(e.target.value.length < 180){
            setUserPost(e.target.value)
        }
        else{
            alert('You cannot post more than 180 chars.');
        }
        
    }

    async function handleSubmit(event){
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        await addDoc(
            collection(db, "userPosts", user.uid, "posts"),
            {
                username:user.displayName,
                userPic: user.photoURL,
                posterId : user.uid,
                text: userPost,
                timestamp : serverTimestamp()
            }
        )
        .then(fetchPosts());
        console.log(user);  
    }

    return (
      <div id="Homepage-div">
        <div className="content-wrapper">
            <div id="content-left">
                <h2>Upcoming Animes</h2>
                <Carousel elementId="upcoming-animes" fetchedArray={upcomingAnimes}/>
                <h2>Seasonal Animes</h2>
                <Carousel elementId="seasonal-animes" fetchedArray={seasonalAnimes}/>
                <h2>Top Animes</h2>
                <Carousel elementId="top-animes" fetchedArray={topAnimes}/>
                <h2>Trending Animes</h2>
                <Carousel elementId="trending-animes" fetchedArray={trendingAnimes}/>
            </div>
            <div id="content-right">
                <div id="homepage-post-form">
                    {getAuth().currentUser &&
                        <form onSubmit={handleSubmit} style={{marginTop:"2vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <textarea maxLength="180" onChange={handleTextChange} rows = "5" cols = "400" style={{marginBottom:"2vw",height:"10vw",width:"20vw",resize:"none"}} placeholder="Share your thoughts..."></textarea>
                        <button style={{backgroundColor:'#1d439b',color:'white',height:'3vw',width:'5vw'}} type="submit">Share!</button>
                        </form>
                    }
                </div>
                <div id="homepage-feed">
                    {postsFetched &&
                        feedPosts.map((post,i) => 
                            <Post key={i} image = {post.userPic} username = {post.username} text = {post.text} />)
                    }
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Homepage;
  