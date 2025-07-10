import './Square.css';

function Square({value, onClick}) {

    /* Props:
    - Value: it has the reference to the content of the game board's cell,
    Which it's actually a cell in the square's state array variable. 
    
    - onClick: it has the reference to an arrow function that executes
    the 'handleClick' function in App.jsx .*/
    
    return (
      <button onClick={onClick} className='square'>{value}</button>
    );
};


export default Square;