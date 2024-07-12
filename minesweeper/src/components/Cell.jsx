"use client";
import { useState } from "react";

function getCellContent(hasMine, adjacentMines) {
  if (hasMine) {
    return <img className="game-icon" src="img/boom.png" alt="boom" />;
  }
  if (adjacentMines > 0) {
    return <p>{adjacentMines}</p>;
  }
  return null;
}

export default function Cell({ cell }) {
  const [isUncovered, setIsUncovered] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  let isDisabled = false;

  const handleFlag = (event) => {
    event.preventDefault(); //so taht context menu doesn't pop up
    if (isFlagged) {
      setIsFlagged(false);
      isDisabled = true;
    } else {
      setIsFlagged(true);
      isDisabled = true;
    }
  };

  const handleReveal = () => {
    setIsUncovered(true);
    isDisabled = false;
  };

  return (
    <>
{!isUncovered ? (
        <section className="cell" onClick={handleReveal} onContextMenu={(event) => handleFlag(event)}>
          {isFlagged && <img className="game-icon" src="../img/flag.png" alt="flag" />}
        </section>
      ) : (
        <section className="cell uncovered">
          {getCellContent(cell.hasMine, cell.adjacentMines)}
        </section>
      )}    </>
  );
}
