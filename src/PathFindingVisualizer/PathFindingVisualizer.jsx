/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import Header from "../components/Header";

export default function PathFindingVisualizer({
  mouseIsPressed,
  setMouseIsPressed,
}) {
  const nodeRef = useRef([]);
  const [grids, setGrids] = useState([]);
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
  const [nodeInShortestPathOrder, setNodeInShortestPathOrder] = useState([]);

  const [START_NODE_ROW, setSTART_NODE_ROW] = useState(-1);
  const [START_NODE_COL, setSTART_NODE_COL] = useState(-1);
  const [FINISH_NODE_ROW, setFINISH_NODE_ROW] = useState(-1);
  const [FINISH_NODE_COL, setFINISH_NODE_COL] = useState(-1);

  const [startClicked, setStartClicked] = useState(false);
  const [finishClicked, setFinishClicked] = useState(false);

  useEffect(() => {
    setGrids(getInitialGrid);
  }, [startClicked, finishClicked]);

  const handleMouseDown = (row, col) => {
    if (startClicked) {
      setSTART_NODE_ROW(row);
      setSTART_NODE_COL(col);
      setStartClicked(false);
    } else if (finishClicked) {
      setFINISH_NODE_ROW(row);
      setFINISH_NODE_COL(col);
      setFinishClicked(false);
    } else{
      const newGrid = getNewGridWithWallToggled(grids, row, col);
      setGrids(newGrid);
      setMouseIsPressed(true);
    }
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

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
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

  return (
    <>
      <Header
        visualizeDijkstra={visualizeDijkstra}
        clearBoard={clearBoard}
        setStartClicked={setStartClicked}
        startClicked={startClicked}
        finishClicked={finishClicked}
        setFinishClicked={setFinishClicked}
      />
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
