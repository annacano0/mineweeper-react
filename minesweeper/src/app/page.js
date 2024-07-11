import "../styles/index.css";
import Board from "../components/Board.jsx"

export default function Home() {
  return (
    <>
      <h1>Minesweeper</h1>
      <Board rows={9} columns={8} mines={2}/>
    </>
  );
}
