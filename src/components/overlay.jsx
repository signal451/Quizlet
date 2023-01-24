import Button from "../components/button";

function Overlay(props) {
  const { isRender, setRender } = props.state;

  const startQuiz = (e) => {
    e.preventDefault();
    setRender(true);
  };

  return (
    <div className="overlay">
      <div>
        <h1> Quizzical </h1>
        <p> Trivia quiz application that you can enjoy &nbsp; 😂 </p>
        <Button onClick={startQuiz} title="Start quiz" />
      </div>
    </div>
  );
}

export default Overlay;
