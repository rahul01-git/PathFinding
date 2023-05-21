export default function VisualizeBtn({ visualizeDijkstra }) {
  return (
    <button
      onClick={() => visualizeDijkstra()}
      className="text-white bg-sky-400 py-2 px-4 rounded mx-4"
    >
      Visualize
    </button>
  );
}