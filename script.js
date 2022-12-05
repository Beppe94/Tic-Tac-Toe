const PlayerFactory = (name, mark) => {
    const playTurn = (board, cell) => {
        const index = board.cells.findIndex(position => position === cell);

        if(board.boardArray[index] === '') {
            board.render();
            return index;
        }
        return null;
    };
    return { name, mark, playTurn };
};


const boardModule = (() => {
    let boardArray = ['','','','','','','','',''];
    const gameBoard = document.getElementById('board');
    const cells = Array.from(document.querySelectorAll('[cell-data]'));
    let winner = null;

    const render = () => {
        boardArray.forEach((mark, index) => {
            cells[index].textContent = boardArray[index];
        });
    };

    const reset = () => {
        boardArray = ['','','','','','','','',''];
    };

    const checkWins = () => {
        const winArray = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        winArray.forEach((combo) => {
            if(boardArray[combo[0]]
                && boardArray[combo[0]] === boardArray[combo[1]]
                && boardArray[combo[0]] === boardArray[combo[2]]) {
                    winner = 'current';
            }
        });
        return winner || (boardArray.includes('') ? null : 'Tie');
    };

    return {render, gameBoard, cells, boardArray, reset, checkWins};
    
})();