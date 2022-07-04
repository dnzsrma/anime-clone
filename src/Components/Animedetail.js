import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { collection, addDoc, serverTimestamp} from "firebase/firestore";

function Detail(props) {
    const { id } = useParams();
    const db = props.db;
    const [anime,setAnime] = useState();
    const [fetched,setFetched] = useState(false);

    useEffect(()=>{
        fetch(`https://kitsu.io/api/edge/anime?filter[id]=${id}`)
        .then(res=> res.json())
        .then(json=> setAnime(json.data[0]));
    },[]);
    useEffect(() => {
        if(anime !== undefined){
            setFetched(true);
        } 
     }, [anime]);

    async function addToFavorites(){
        const auth = getAuth();
        const user = auth.currentUser;
        await addDoc(
            collection(db, "userFavorites", user.uid, "favorites"),
            {
                animeId: anime.id,
                animePic:anime.attributes.posterImage.tiny,
                animeName: anime.attributes.titles.en,
                userId: user.uid,
                timestamp : serverTimestamp()
            }
        )
    }

    return (
      <div className="detailpage">
        <div className="content-wrapper">
            <button onClick={() => {console.log(anime)}}></button>
            {fetched &&
                <div id="anime-detail">
                    <h2 id="detail-title">{anime.attributes.titles.en_jp}</h2>
                    <div id="detail-info">
                         <img id="detail-poster"alt={anime.attributes.titles.en_jp} src={anime.attributes.posterImage.small}></img>
                         <div id="detail-info-column">
                            <h5>Alternative Titles</h5>
                            <p><strong>Japanese: </strong> {anime.attributes.titles.ja_jp}</p>
                            <p><strong>English: </strong>{anime.attributes.titles.en}</p>
                            <h5>Information</h5>
                            <p><strong>Type: </strong> {anime.attributes.subtype}</p>
                            <p><strong>Episodes: </strong> {anime.attributes.episodeCount}</p>
                            <p><strong>Status: </strong> {anime.attributes.status}</p>
                            <p><strong>Aired: </strong> {anime.attributes.startDate} to {anime.attributes.endDate}</p>
                            <p><strong>Episode Length: </strong> {anime.attributes.episodeLength} Min.</p>
                            <p><strong>Nsfw: </strong> {anime.attributes.nsfw ? <x>Yes</x> : <x>No</x>} </p>
                         </div>
                    </div>
                    <button onClick={addToFavorites} id="add_favorite">Add Favorites</button>
                    <div id="detail-bar">
                        <div>
                            <p>Rating: </p>
                            <p>{anime.attributes.averageRating}</p>
                            <p style={{fontSize: ".7em"}}>Status: {anime.attributes.status}</p>
                        </div>
                        <div style={{marginLeft:"-1.5vw"}}>
                            <p>Rank:</p>
                            <p>{anime.attributes.ratingRank}</p>
                            <p style={{fontSize: ".7em"}}>{anime.attributes.subtype}</p>
                        </div>
                        <div style={{marginLeft:"-1.5vw"}}>
                            <p>Popularity:</p>
                            <p>{anime.attributes.popularityRank}</p>
                        </div>
                    </div>
                    
                    <div id="detail-synopsis">
                        <h5>Synopsis</h5>
                        <p>{anime.attributes.synopsis}</p>
                        <h5>Trailer</h5>
                        <iframe      
                            width="150"
                            height="100"
                            src={`http://www.youtube.com/embed/${anime.attributes.youtubeVideoId}`}
                            frameBorder="0"
                            allowFullScreen
                            title="Embedded youtube"/>
                    </div>
                </div>
            }
        </div>
      </div>
    );
  }
  
  export default Detail;
  