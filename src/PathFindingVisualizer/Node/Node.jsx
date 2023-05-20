import { forwardRef } from "react";
import "./node.css";

const Node = forwardRef(({ isStart, isFinish, row, col }, ref) => {
  const extraClass = isFinish ? "bg-red-500" : isStart ? "bg-green-500" : "";

  return (
    <div
      className={`w-5 h-5 border-2 border-gray-200 inline-block cursor-pointer ${extraClass}`}
      id={`${row}-${col}`}
      ref={ref}
    ></div>
  );
});

export default Node;
