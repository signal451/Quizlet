function Button(props) {
  return (
    <div className="btn-layout">
      <button className="button" onClick={props.onClick}>
        {" "}
        {props.title}{" "}
      </button>
    </div>
  );
}

export default Button;
