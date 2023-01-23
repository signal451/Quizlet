import { useState } from "react";
import Blob_yellow from "./assets/y_blobs.png";
import Blob_white from "./assets/w_blobs.png";
import Overlay from "./components/overlay";
import "./App.css";

function App() {
  const [isRender, setRender] = useState(false);

  // check status and depending on that render it ..

  return (
    <div className="app">
      <div className="yellow">
        <img src={Blob_yellow} />
      </div>
      <div className="white">
        <img src={Blob_white} />
      </div>
      {isRender == true ? <> </> : <Overlay state={{isRender, setRender}}/>}
    </div>
  );
}

export default App;
