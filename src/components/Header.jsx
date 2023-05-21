import ClearBtn from "./ClearBtn";
import VisualizeBtn from "./VisualizeBtn";

export default function Header({visualizeDijkstra,clearBoard,setStartClicked,setFinishClicked,startClicked,finishClicked}) {

  return (
    <header className="border-b px-3 mb-2 bg-gray-700 text-white text-base">
      <div className="flex items-center py-2 justify-evenly">
        <a to="/" className="flex items-center">
          <span className="ml-2 text-2xl font-bold">PathFinder</span>
        </a>
        <button onClick={()=>setStartClicked(true)} className={startClicked?"bg-green-500 px-4 py-2": ''}>Set Start Point</button>
        <button onClick={()=>setFinishClicked(true)} className={finishClicked?"bg-green-500 px-4 py-2": ''}>Set Finish Point</button>
        <VisualizeBtn visualizeDijkstra={visualizeDijkstra}/>
        <ClearBtn clearBoard={clearBoard}/>
      </div>
    </header>
  );
}
