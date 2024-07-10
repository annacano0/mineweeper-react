'use client'
import { useState } from 'react';

function handleLeftClick(event){
    console.log("reveal cell")
}

function handleRightClick(event){
    event.preventDefault();
    console.log('flag / unflag cell')
}

export default function Cell({cell}) {
    const [isUncovered, setIsUncovered]= useState(false);
    const [isTagged, setIsTagged]= useState(false);
    const hasMine=cell.hasMine
    return (
        <section className="cell" onClick={handleLeftClick} onContextMenu={(event)=>handleRightClick(event)} >
            <p>{cell.coordinates[0]+"," +cell.coordinates[1]}</p>
        </section>
    ); 
}