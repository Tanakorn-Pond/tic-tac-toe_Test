import "./tic-tac-toe.css";

type BoardProps = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
};

export const Board = ({ board, handleClick }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board_row">
          {row.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              className={`cell ${cell ? `cell_${cell.toLowerCase()}` : ""}`}
              type="button"
              onClick={() => handleClick(rowIndex, cellIndex)}
              disabled={cell !== null}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
