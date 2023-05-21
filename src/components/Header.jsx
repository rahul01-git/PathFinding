import VisualizeBtn from "./VisualizeBtn";

export default function Header({visualizeDijkstra}) {
  return (
    <header className="border-b px-3 mb-2">
      <div className="flex items-center py-2 justify-evenly">
        <a to="/" className="flex items-center">
          <span className="ml-2 text-lg font-bold">PathFinder</span>
        </a>
        <span>Algorith</span>
        <span>Maze Generator</span>
        <VisualizeBtn visualizeDijkstra={visualizeDijkstra}/>
        <button className="text-lx font-bold" onClick={()=>alert("clicked")}>Clear Board</button> 
        <span>Speed: fast</span> 
      </div>
    </header>
  );
}
