import { forwardRef } from "react";
import "./node.css";

const Node = forwardRef(({ isStart, isFinish, isWall,onMouseDown,onMouseEnter,onMouseUp,row,col }, ref) => {
  const extraClass = isFinish ? "bg-red-500" : isStart ? "bg-green-500" : isWall? "node-wall" : "";

  return (
    <div
      className={`w-5 h-5 border-2 border-gray-200 inline-block cursor-pointer ${extraClass}`}
      ref={ref}
      onMouseDown={()=>onMouseDown(row,col)}
      onMouseEnter={()=>onMouseEnter(row,col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
});

export default Node;
