'use client'
import Cell from './Cell.jsx';
import { useState } from 'react';


function generateBoard() { //TODO: add here mine generation and adjacent count
  let rows = 4;
  let columns = 3;
  let newBoard = [];
  for (let i = 0; i <= rows - 1; i++) {
    let newRow = [];
    for (let j = 0; j <= columns - 1; j++) {
      let newCell = {
        coordinates: [i,j],
        hasMine: false,
        adjacentMines: 0,
      };
      newRow.push(newCell);
    }
    newBoard.push(newRow);
  }
  return newBoard;
}

export default function Board() {
  const [board, setBoard] = useState(generateBoard()); //this can become an state that gets init. by useState?
  return (
    <>
      <section className="board">
      {board.map((row, rowIndex) => (
          <section key={rowIndex} className="board-row">
            {row.map((cell, columnIndex) => (
              <Cell key={`${rowIndex}-${columnIndex}`} cell={cell}></Cell>
            ))}
          </section>
        ))}
      </section>
    </>
  );
}
