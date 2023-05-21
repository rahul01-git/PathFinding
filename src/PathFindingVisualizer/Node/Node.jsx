import { forwardRef } from "react";
import { VscDebugStart } from 'react-icons/vsc';
import { FaBullseye } from 'react-icons/fa';
import "./node.css";

const Node = forwardRef(({ isStart, isFinish, isWall,onMouseDown,onMouseEnter,onMouseUp,row,col }, ref) => {
  const extraClass = isFinish ? "text-red-500" : isStart ? "text-green-500" : isWall? "node-wall" : "";

  return (
    <div
      className={`w-5 h-5 border-2 border-gray-200 inline-block cursor-pointer ${extraClass}`}
      ref={ref}
      onMouseDown={()=>onMouseDown(row,col)}
      onMouseEnter={()=>onMouseEnter(row,col)}
      onMouseUp={() => onMouseUp()}
    >{isStart? <VscDebugStart/> : isFinish?<FaBullseye/> : '' }</div>
  );
});
Node.displayName = 'Node';
export default Node;
