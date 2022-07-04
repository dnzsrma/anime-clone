function Favorite(props) {


    return (
      <div className="user-favorite">
          <img alt="post user" src={props.pic}></img>
          <h3>{props.title}</h3>
      </div>
    );
  
  }
  
  export default Favorite;