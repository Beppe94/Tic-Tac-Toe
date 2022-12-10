// Factory function for players name and sign
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

//Module for game board, reset function and check the winner
const boardModule = (() => {
    let boardArray = ['','','','','','','','',''];
    const gameBoard = document.querySelector('#board');
    const cells = Array.from(document.querySelectorAll('.cell'));
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

//Module that interact with DOM to get players names, initialize the game and switch turns
const PlayGame = (() => {
    const player1Name = document.getElementById('player1');
    const player2Name = document.getElementById('player2');
    const opponentsText = document.querySelector('.myForm');
    const form = document.querySelector('.player-info');
    const resetBtn = document.getElementById('reset');

    let currentPlayer;
    let playerOne;
    let playerTwo;

    const switchTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const GameRound = () => {
        const board = boardModule;
        const gameStatus = document.querySelector('.game-status');

        if(currentPlayer.name != '') {
            gameStatus.textContent = `${currentPlayer.name}'s Turn`;
        } else {
            gameStatus.textContent = 'Board';
        }

        board.gameBoard.addEventListener('click', (e) => {
            e.preventDefault();
    
            const play = currentPlayer.playTurn(board, e.target);
            if(play != null) {
                board.boardArray[play] = `${currentPlayer.mark}`;
                board.render();
                const winStatus = board.checkWins();
                if(winStatus === 'Tie') {
                    gameStatus.textContent = 'Tie!';
                } else if(winStatus === null) {
                    switchTurn();
                    gameStatus.textContent = `${currentPlayer.name}'s Turn..`;
                } else {
                    gameStatus.textContent = `${currentPlayer.name} Wins!`;
                    board.reset();
                    board.render();
                }
            }
        });
    };

    const StartGame = () => {
        if(player1Name.value !== '' && player2Name.value !== '') {
            playerOne = PlayerFactory(player1Name.value , 'X');
            playerTwo = PlayerFactory(player2Name.value, 'O');
            currentPlayer = playerOne;
            GameRound();
        }
    };

    form.addEventListener('submit',(e) => {
        e.preventDefault();
        if(player1Name.value !== '' && player2Name.value !== '') {
            StartGame();
            form.classList.add('hidden');
            opponentsText.classList.add('hidden');
        } else {
            window.location.reload();
        }
    });

    resetBtn.addEventListener('click', () => {
        document.querySelector('.game-status').textContent = 'Board';
        document.getElementById('player1').value = '';
        document.getElementById('player2').value = '';
        window.location.reload();
    });
    
    return { StartGame }
})();

PlayGame.StartGame();   