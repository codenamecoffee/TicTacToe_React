// Components
import Square from './components/Square/Square.jsx';

// Style
import './App.css';
import { useEffect, useState } from 'react';


// Main Component: Tic-Tac-Toe
function App() {

  // To manage the values that the board will take.
  const [squares, setSquares] = useState(Array(9).fill(''));

  // To manage the the turns of the players.
  const [isXTurn, setIsXTurn] = useState(true);
  // - True: X player's turn.
  // - False: O player's turn.
 
  // To manage the status of the game.
  const [status, setStatus] = useState('');
  // - Either because there is a winner.
  // - Or there is a draw.
  // - Or the board is full.



  function handleClick(getCurrentSquare) {

    // We make a copy of the squares array using the spread operator.
    let copySquares = [...squares];

    // If there is no winner, and the square's content is empty:
    if(getWinner(copySquares) === null && !copySquares[getCurrentSquare]) {

      // We fill the current square basing on if it's X turn or not.
      copySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
      
      /* We update the isXTurn state using the opposite of itself, 
      creating a 'toggle' functionality. */
      setIsXTurn(!isXTurn);

      // Then we update the board.
      setSquares(copySquares);
    };
  };

  

  function handleRestart(){
    // Change the turn so the other player can start the new game next time.
    setIsXTurn(!isXTurn);
    // Empty the game board to play again.
    setSquares(squares.fill(''));
  };
  
  
  
  function getWinner (squares) {

    let winner = null;

    const winningPatterns = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [2,5,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7]

      /* Those are all the possible 
      winning patterns from the game board,
      that has this appearence:
                                  0 1 2
                                  3 4 5
                                  6 7 8
      */
    ];

    let i = 0; // while loop variable.
    
    // While we still have winning patterns and there is no winner:
    while ( i < winningPatterns.length && winner === null) {
      
      // Analyze the winning pattern:
      const [pos_1, pos_2, pos_3] = winningPatterns[i];

      // If, in a filled pattern, we found only three 'X' or only three 'O':
      if(squares[pos_1] &&
      squares[pos_1] === squares[pos_2] && 
      squares[pos_2] === squares[pos_3]){

        // Set the winner. 
        winner = squares[pos_1];
      };
      
      i++;
    }


    return winner; // null or squares[pos_1].

    /* Remember: squares is an array, so
    squares[pos_1] returns an 'X' or an 'O'. */

  };



  useEffect(() => {
    // If there is a draw:
    if(getWinner(squares) === null && squares.every(value => value !== '')){
      setStatus('This is a draw! Please restart the game.'); 
    } 
    // If there is a winner:
    else if(getWinner(squares) !== null){ 
      setStatus(`Winner is ${getWinner(squares)}. Please restart the game.`);
    }
    // If the game keeps going:
    else {
      setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
    }

  }, [squares, isXTurn]);
  // Executes whenever there is a change in the gameboard or player turn.


  return (
    <div className="board-container">
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)}/>
        <Square value={squares[2]} onClick={() => handleClick(2)}/>
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)}/>
        <Square value={squares[4]} onClick={() => handleClick(4)}/>
        <Square value={squares[5]} onClick={() => handleClick(5)}/>
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)}/>
        <Square value={squares[7]} onClick={() => handleClick(7)}/>
        <Square value={squares[8]} onClick={() => handleClick(8)}/>
      </div>
      <h1>{status}</h1>
      <button onClick={handleRestart}>Restart</button>
    </div>
  )
};

export default App;
