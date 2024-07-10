'use client'
import { useState } from 'react';

export default function Cell({cell}) {
    const [isUncovered, setIsUncovered]= useState(false);
    const [isTagged, setIsFlagged]= useState(false);
    const hasMine=cell.hasMine

    const handleFlag = (event) => {
        event.preventDefault();
        if(isUncovered) setIsFlagged(false)
        else setIsFlagged(true)
        console.log('flag / unflag cell')
    }

    const handleReveal = () => {
        setIsUncovered(true)
        console.log("reveal cell")
    }

    return (
        <section className="cell" onClick={handleReveal} onContextMenu={(event)=>handleFlag(event)} >
            {<p>{cell.coordinates[0]+"," +cell.coordinates[1]}</p>}
        </section>
    ); 

    
}