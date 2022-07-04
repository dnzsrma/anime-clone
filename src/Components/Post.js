function Post(props) {


  return (
    <div className="user-post">
        <img alt="post user" src={props.image}></img>
        <h5>{props.username}</h5>
        <div className="post-content">{props.text}</div>
    </div>
  );

}

export default Post;