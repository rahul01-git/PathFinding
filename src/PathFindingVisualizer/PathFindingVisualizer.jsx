import React, { useEffect, useState } from "react";
import "./PathFindingVisualizer.css";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 12;
const FINISH_NODE_COL = 35;

export default function PathFindingVisualizer() {
  const [grids, setGrids] = useState([]);
  useEffect(() => {
    setGrids(getInitialGrid);
  }, []);

  const visualizeDijkstra = () => {
    const startNode = grids[START_NODE_ROW][START_NODE_COL];
    const finishNode = grids[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grids, startNode, finishNode);
    console.log(getNodesInShortestPathOrder(finishNode));
  };

  return (
    <>
      <button
        onClick={() => visualizeDijkstra()}
        className="text-white bg-sky-400 py-2 px-4 m-4 rounded"
      >
        Visualize
      </button>
      {grids.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                isStart={node.isStart}
                isFinish={node.isFinish}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
