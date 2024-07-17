'use client'
import Cell from './Cell.jsx';
import { useState } from 'react';

function checkIsMine(board, i, j){
    if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
        if (board[i][j].hasMine == 1) return 1
      }
      return 0;
}


function addAdjacentMineCounter(board){
    let boardWithAdyacent=board
    for (let i = 0; i < boardWithAdyacent.length; i++) {
        for (let j = 0; j < boardWithAdyacent[i].length; j++) {
          let counter = 0;
  
          counter += checkIsMine(boardWithAdyacent,i - 1, j); // Arriba
          counter += checkIsMine(boardWithAdyacent, i + 1, j); // Abajo
          counter += checkIsMine(boardWithAdyacent, i, j - 1); // Izquierda
          counter += checkIsMine(boardWithAdyacent, i, j + 1); // Derecha
          counter += checkIsMine(boardWithAdyacent, i - 1, j - 1); // Esquina sup izq
          counter += checkIsMine(boardWithAdyacent, i - 1, j + 1); // Esquina sup d
          counter += checkIsMine(boardWithAdyacent, i + 1, j - 1); // Esquina inf izq
          counter += checkIsMine(boardWithAdyacent, i + 1, j + 1); // Esquina inf d
  
          board[i][j].adjacentMines = counter;
          console.log("Pos: "+i+" "+j+" Added:"+ counter)
        }
      }
    console.log("entra en añadir numeros")
    return boardWithAdyacent
}

function addMinesToBoard(board, rows, columns, mines){
    let minesLeftToAdd = mines;
    while (minesLeftToAdd > 0) {
      let j = Math.floor(Math.random() * rows);
      let i = Math.floor(Math.random() * columns);
      if (board[i][j].hasMine === 0) { // 0 is false
        board[i][j].hasMine = 1; //1 is true
        minesLeftToAdd--;
        console.log("Mines left: "+minesLeftToAdd+" Pos:"+i+" "+j);
      }
    }
    return board
}

function generateBoard(rows, columns, mines) {
  let emptyBoard = [];
  for (let i = 0; i <= rows - 1; i++) {
    let newRow = [];
    for (let j = 0; j <= columns - 1; j++) {
      let newCell = {
        coordinates: [i,j],
        hasMine: 0,
        adjacentMines: 0,
      };
      newRow.push(newCell);
    }
    emptyBoard.push(newRow);
  }
  let boardWithMines= addMinesToBoard(emptyBoard, rows, columns, mines)
  let boardWithAdjacentMines= addAdjacentMineCounter(boardWithMines) //TODO: acabar esto
  return boardWithAdjacentMines;
}

export default function Board({rows, columns, mines}) {
  const [board, setBoard] = useState(generateBoard(rows, columns, mines));

  const resetBoard = () => {
    setBoard(generateBoard(rows, columns, mines))
  }

  return (
    <>
      <section className="board">
      {board.map((row, rowIndex) => (
          <section key={rowIndex} className="board-row">
            {row.map((cell, columnIndex) => (
              <Cell key={columnIndex} cell={cell}></Cell>
            ))}
          </section>
        ))}
      </section>
    </>
  );
}
