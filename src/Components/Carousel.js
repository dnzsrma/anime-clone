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
    <div id={props.elementId} className="carousel">
    <button onClick={scrollLeft} className="carousel-buttons" style={{left:"0", marginLeft:"-40px"}}>&larr;</button>
    
    {
        props.fetchedArray.map(anime =>
        <Link key={anime.id} to={{pathname:`/animes/${anime.id}`}}><img alt={anime.attributes.titles.en_jp} className="anime-card"src={anime.attributes.posterImage.small}/></Link>
        )
    }

<button onClick={scrollRight} className="carousel-buttons" style={{right:"0px",marginRight:"-40px"}}>&rarr;</button>
    </div>
  );
}

export default Carousel;