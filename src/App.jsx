import { useState } from "react";
import PathFindingVisualizer from "./PathFindingVisualizer/PathFindingVisualizer";

export default function App() {
   const [mouseIsPressed , setMouseIsPressed] = useState(false);
  return (
    <div className="text-center m-10" onMouseLeave={()=>setMouseIsPressed(false)}>
      <PathFindingVisualizer mouseIsPressed={mouseIsPressed} setMouseIsPressed={setMouseIsPressed}/>
    </div>
  );
}
