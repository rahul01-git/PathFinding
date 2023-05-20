import React, { useEffect, useState } from "react";
import "./PathFindingVisualizer.css";
import Node from "./Node/Node";
export default function PathFindingVisualizer() {
  const [grids, setGrids] = useState([]);
  useEffect(() => {
    setGrids(getInitialGrid);
  }, []);

  return (
    <>
      {grids.map((row, rowIdx) => {
        return (
          <div>
            {row.map((node, nodeIdx) => (
              <Node />
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
    isStart: row === 10 && col === 5,
    isFinish: row === 8 && col === 19,
  };
};
