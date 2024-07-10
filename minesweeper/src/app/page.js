import "../styles/index.css";
import Board from "../components/Board.jsx"

export default function Home() {
  return (
    <>
      <h1>Minesweeper</h1>
      <Board rows={3} columns={3} mines={1}/>
    </>
  );
}
