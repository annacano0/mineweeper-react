'use client'
import { useState } from 'react';

function getCellContent(hasMine, adjacentMines){
    let content=''
    if(hasMine === 1) content='mine';
    else{
        if(adjacentMines>0) content=adjacentMines
    }
    return content
}

export default function Cell({ cell }) {
    const [isUncovered, setIsUncovered] = useState(false);
    const [isTagged, setIsFlagged] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false)
    const cellContent= getCellContent(cell.hasMine, cell.adjacentMines)

    const handleFlag = (event) => {
        event.preventDefault();//so taht context menu doesn't pop up
        if (!isBlocked) {
            if (isTagged) setIsFlagged(false)
            else {
                setIsFlagged(true)
                setIsBlocked(false)
            }
        }
    }

    const handleReveal = () => {
        if (!isBlocked) {
            setIsUncovered(true)
            setIsBlocked(true)
        }
    }

    return (
        <section className="cell" onClick={handleReveal} onContextMenu={(event) => handleFlag(event)} >
            {isUncovered === true && (cellContent)}            
        </section>
    );


}