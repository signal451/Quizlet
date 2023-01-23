import { useState } from "react";
import Blob_yellow from "./assets/y_blobs.png";
import Blob_white from "./assets/w_blobs.png";
import Overlay from "./components/overlay";
import Quizzlet from "./components/quiz";
import "./App.css";

/*
  TODO
      1. Design front-end
      2.. Load questions from API ...
      3. Use styled components to change reduntent component style for different usage. 

*/ 

function App() {
  const [isRender, setRender] = useState(false);
  return (
    <div className="app">
      <div className="yellow">
        <img src={Blob_yellow} />
      </div>
      <div className="white">
        <img src={Blob_white} />
      </div>
      {isRender == true ? <Quizzlet/> : <Overlay state={{isRender, setRender}}/>}
    </div>
  );
}

export default App;
