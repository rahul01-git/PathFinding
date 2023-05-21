import { forwardRef } from "react";
import { VscDebugStart } from 'react-icons/vsc';
import { FaBullseye } from 'react-icons/fa';
import "./node.css";

const Node = forwardRef(({ isStart, isFinish, isWall,onMouseDown,onMouseEnter,onMouseUp,row,col }, ref) => {
  const extraClass = isFinish ? "text-red-500" : isStart ? "text-green-500" : isWall? "node-wall" : "";

  return (
    <div
      className={`w-7 h-7 border-2 border-gray-200 inline-block cursor-pointer ${extraClass}`}
      ref={ref}
      onMouseDown={()=>onMouseDown(row,col)}
      onMouseEnter={()=>onMouseEnter(row,col)}
      onMouseUp={() => onMouseUp()}
    >{isStart? <VscDebugStart className="text-2xl"/> : isFinish?<FaBullseye className="text-2xl"/> : '' }</div>
  );
});
Node.displayName = 'Node';
export default Node;
