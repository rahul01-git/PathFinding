import { useState } from "react";
import PathFindingVisualizer from "./PathFindingVisualizer/PathFindingVisualizer";
import Popup from "./components/Popup";

export default function App() {
   const [mouseIsPressed , setMouseIsPressed] = useState(false);
  return (
    <div className="text-center" onMouseLeave={()=>setMouseIsPressed(false)}>
      <Popup/>
      <PathFindingVisualizer mouseIsPressed={mouseIsPressed} setMouseIsPressed={setMouseIsPressed}/>
    </div>
  );
}
