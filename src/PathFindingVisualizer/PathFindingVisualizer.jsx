import { useEffect, useRef, useState } from "react";
import "./PathFindingVisualizer.css";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import Header from "../components/Header";
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 12;
const FINISH_NODE_COL = 35;

export default function PathFindingVisualizer({
  mouseIsPressed,
  setMouseIsPressed,
}) {
  const [grids, setGrids] = useState([]);
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
  const [nodeInShortestPathOrder, setNodeInShortestPathOrder] = useState([]);

  const nodeRef = useRef([]);
  useEffect(() => {
    setGrids(getInitialGrid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grids, row, col);
    setGrids(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grids, row, col);
    setGrids(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualizeDijkstra = () => {
    const startNode = grids[START_NODE_ROW][START_NODE_COL];
    const finishNode = grids[FINISH_NODE_ROW][FINISH_NODE_COL];
    setVisitedNodesInOrder(dijkstra(grids, startNode, finishNode));
    setNodeInShortestPathOrder(getNodesInShortestPathOrder(finishNode));
  };
  useEffect(() => {
    if (visitedNodesInOrder.length > 0 && nodeInShortestPathOrder.length > 0) {
      animateDijkstra(visitedNodesInOrder, nodeInShortestPathOrder);
    }
  }, [visitedNodesInOrder, nodeInShortestPathOrder]);

  const animateDijkstra = (visitedNodesInOrder, nodeInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodeInShortestPathOrder);
        }, 10 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          const { row, col } = node;
          nodeRef.current[row][col].classList.add("node-visited");
        }, 10 * i);
      }
    }
  };

  const animateShortestPath = (nodeInShortestPathOrder) => {
    for (let i = 0; i < nodeInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodeInShortestPathOrder[i];
        const { row, col } = node;
        nodeRef.current[row][col].classList.add("shortest-path");
      }, 50 * i);
    }
  };

  const clearBoard = () => {
    setGrids(getInitialGrid());

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      for (let i = 0; i < nodeInShortestPathOrder.length; i++) {
        const node = nodeInShortestPathOrder[i];
        const { row, col } = node;
        nodeRef.current[row][col].classList.remove("shortest-path");
      }
      const node = visitedNodesInOrder[i];
      const { row, col } = node;
      nodeRef.current[row][col].classList.remove("node-visited");
    }
    setVisitedNodesInOrder([]);
    setNodeInShortestPathOrder([]);
  };

  return (
    <>
      <Header visualizeDijkstra={visualizeDijkstra} clearBoard={clearBoard} />
      {grids.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className="flex flex-row justify-center">
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                isStart={node.isStart}
                isFinish={node.isFinish}
                row={node.row}
                col={node.col}
                mouseIsPressed={mouseIsPressed}
                isWall={node.isWall}
                onMouseDown={(row, col) => handleMouseDown(row, col)}
                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                onMouseUp={() => handleMouseUp()}
                ref={(ref) => {
                  nodeRef.current[node.row] = nodeRef.current[node.row] || [];
                  nodeRef.current[node.row][node.col] = ref;
                }}
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

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
