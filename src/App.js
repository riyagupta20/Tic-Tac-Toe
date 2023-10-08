import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./Components/Board";
import ScoreBoard from "./Components/ScoreBoard";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXIsPlaying] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [tie, setTie] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoxClick = (boxID) => {
    if (board[boxID] || gameOver) {
      return;
    }

    const updatedBoard = board.map((value, id) => {
      if (id === boxID) {
        return xIsPlaying ? "X" : "O";
      } else {
        return value;
      }
    });
    setBoard(updatedBoard);
    setXIsPlaying(!xIsPlaying);
    const winner = checkWinner(updatedBoard);

    if (winner === "X" || winner === "O") {
      setGameOver(true);
      setWinnerMessage(`Player ${winner} Wins!`);
      updateScores(winner);
    } else if (winner === "Tie") {
      setGameOver(true);
      setWinnerMessage("It's a Tie!");
      updateScores("Tie");
    }
  };

  const checkWinner = (updatedBoard) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (
        updatedBoard[x] &&
        updatedBoard[x] === updatedBoard[y] &&
        updatedBoard[y] === updatedBoard[z]
      ) {
        return updatedBoard[x];
      }
    }
    if (updatedBoard.every((value) => value !== null)) {
      return "Tie";
    }
    return null;
  };

  const updateScores = (winner) => {
    if (winner === "X") {
      setXScore(xScore + 1);
    } else if (winner === "O") {
      setOScore(oScore + 1);
    } else if (winner === "Tie") {
      setTie(tie + 1);
    }
  };

  const playAgain = () => {
    setGameOver(false);
    setWinnerMessage("");
    setBoard(Array(9).fill(null));
    setXIsPlaying(true);
  };

  const resetGame = () => {
    setGameOver(false);
    setWinnerMessage("");
    setBoard(Array(9).fill(null));
    setXScore(0);
    setOScore(0);
    setTie(0);
    setXIsPlaying(true);
  };

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        playAgain(); // Automatically start a new game after a delay
      }, 4000); // Adjust the delay time (in milliseconds) as needed
    }
  }, [gameOver]);

  return (
    <div className="App">
      <h1 style={{"text-decoration":"underline wavy"}}>Tic-Tac-Toe</h1>
      <ScoreBoard xScore={xScore} oScore={oScore} tie={tie} playing={xIsPlaying} />
      <Board board={board} onClick={handleBoxClick} />
      <h1 className="winner-message">{winnerMessage}</h1>
      <button className="btn" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}
export default App;
