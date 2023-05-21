import ClearBtn from "./ClearBtn";
import VisualizeBtn from "./VisualizeBtn";

export default function Header({visualizeDijkstra,clearBoard }) {
  return (
    <header className="border-b px-3 mb-2 bg-gray-700 text-white text-base">
      <div className="flex items-center py-2 justify-evenly">
        <a to="/" className="flex items-center">
          <span className="ml-2 text-2xl font-bold">PathFinder</span>
        </a>
        {/* <span>Algorith</span> */}
        {/* <span>Maze Generator</span> */}
        <VisualizeBtn visualizeDijkstra={visualizeDijkstra}/>
        <ClearBtn clearBoard={clearBoard}/>
        {/* <span>Speed: fast</span>  */}
      </div>
    </header>
  );
}
