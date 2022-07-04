import { Link } from "react-router-dom";

function Carousel(props) {

    function scrollRight(){
        document.getElementById(props.elementId).scrollBy({
            left: 55 * window.innerWidth/100,
            behavior: 'smooth'
          })
    }
    function scrollLeft(){
        document.getElementById(props.elementId).scrollBy({
            left: -55 * window.innerWidth/100,
            behavior: 'smooth'
          })
    }

  return (
    <div id={props.elementId}>
    <button onClick={scrollLeft} style={{background:"white",position: "sticky",top:"4vw",left:"1%",height:"10vw",width:"45px",opacity:".9",borderRadius:"1vw"}}>&larr;</button>
    <button onClick={scrollRight} style={{background:"white",position: "sticky",top:"4vw",left:"95%",height:"10vw",width:"45px",opacity:".9",borderRadius:"1vw"}}>&rarr;</button>
    {
        props.fetchedArray.map(anime =>
        <Link key={anime.id} to={{pathname:`/animes/${anime.id}`}}><img alt={anime.attributes.titles.en_jp} className="anime-card"src={anime.attributes.posterImage.small}/></Link>
        )
    }
    
    </div>
  );
}

export default Carousel;