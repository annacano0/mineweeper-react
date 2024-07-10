'use client'
import Cell from './Cell.jsx';
import { useState } from 'react';

function addMinesToBoard(board){// TODO: implement this with random 0 or 1
    return board
}

function generateBoard(rows, columns, mines) { //TODO: modify how mines are added
  let emptyBoard = [];
  let minesLeftToAdd = mines
  for (let i = 0; i <= rows - 1; i++) {
    let newRow = [];
    for (let j = 0; j <= columns - 1; j++) {
      let addMineToCell = 0
      if(minesLeftToAdd>0){
        addMineToCell=Math.floor(Math.random() * 2)
        if(addMineToCell==1) minesLeftToAdd--
        console.log(addMineToCell)  
      } 
        
      let newCell = {
        coordinates: [i,j],
        hasMine: addMineToCell,
        adjacentMines: 0,
      };
      newRow.push(newCell);
    }
    emptyBoard.push(newRow);
  }
  let boardWithMines= addMinesToBoard(emptyBoard)
  return boardWithMines;
}

export default function Board({rows, columns, mines}) {
  const [board, setBoard] = useState(generateBoard(rows, columns, mines)); //this can become an state that gets init. by useState?
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
