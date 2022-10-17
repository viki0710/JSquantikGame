function screenChanger(id){
    var scenes = ["menu", "rules", "game"];
    var elem;
    scenes.forEach(i => {
        if(i == id) {
            elem = document.getElementById(i);
            elem.classList.remove("hide"); 
        }
        else {
            elem = document.getElementById(i);
            elem.classList.add("hide");
        }
    });

    if(id == "game") game();
}

function game() {
    
}

console.log("by viktoria balla | l9z49i");

const BOARD_SIZE = 4;

const TileColour = {
    LIGHT: 0,
    DARK: 1
};

const Symbol = {
    NONE: 0,
    SQUARE: 1,
    TRIANGLE: 2,
    CIRCLE: 3,
    PLUS: 4
};

const PlayerNum = {
    EMPTY: 0,
    P1: 1,
    P2: 2
};

class Field {
    colour = TileColour.LIGHT;
    symbol = Symbol.NONE;
    playerNum = PlayerNum.EMPTY;
}

class AppState {
    board = [];

    init() {
        this.board = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            this.board[y] = [];
            for (let x = 0; x < BOARD_SIZE; x++) {
                this.board[y][x] = new Field();
                if ((x >= 2 && y >= 2) || (x < 2 && y < 2))
                    this.board[y][x].colour = TileColour.LIGHT;
                else this.board[y][x].colour = TileColour.DARK;

                this.board[y][x].symbol = Symbol.NONE;
                this.board[y][x].playerNum = PlayerNum.EMPTY;
            }
        }
    }

    checkRow() {
        console.log("checking rows...");
        let isWon = false;
        for (let y = 0; y < BOARD_SIZE; y++) {
            let isRowFull = true;
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (this.board[y][x].symbol == Symbol.NONE) {
                    isRowFull = false;
                }
            }
            if (isRowFull) isWon = true;
            //exit and display win
            console.log("is the game won: " + isWon);
        }
    }

    checkColumn() {
        console.log("checking columns...");
        let isWon = false;
        for (let y = 0; y < BOARD_SIZE; y++) {
            let isColumnFull = true;
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (this.board[x][y].symbol == Symbol.NONE) {
                    isColumnFull = false;
                }
            }
            if (isColumnFull) isWon = true;
            //exit and display win
            console.log("is the game won: " + isWon);
        }
    }

    checkSquare() {
        console.log("checking squares...");
        let isWon = false;
        let isSquare1Full = true;
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 2; x++) {
                if (this.board[y][x].symbol == Symbol.NONE) {
                    isSquare1Full = false;
                }
            }
        }
        if (isSquare1Full) isWon = true;
        let isSquare2Full = true;
        for (let y = 2; y < 4; y++) {
            for (let x = 0; x < 2; x++) {
                if (this.board[y][x].symbol == Symbol.NONE) {
                    isSquare2Full = false;
                }
            }
        }
        if (isSquare2Full) isWon = true;
        let isSquare3Full = true;
        for (let y = 0; y < 2; y++) {
            for (let x = 2; x < 4; x++) {
                if (this.board[y][x].symbol == Symbol.NONE) {
                    isSquare3Full = false;
                }
            }
        }
        if (isSquare3Full) isWon = true;
        let isSquare4Full = true;
        for (let y = 2; y < 4; y++) {
            for (let x = 2; x < 4; x++) {
                if (this.board[y][x].symbol == Symbol.NONE) {
                    isSquare4Full = false;
                }
            }
        }
        if (isSquare4Full) isWon = true;
        console.log("is the game won: " + isWon);
    }
}

function render(state) {
    return renderTable(state.board);
}

function renderTable(board) {
    return `<table>${board.map(renderRow).join("")}</table>`;
}

function renderRow(row) {
    return `<tr style="height:25%">${row.map(renderField).join("")}</tr>`;
}

function renderField(field) {
    if (field.colour === TileColour.LIGHT) {
        return `
            <td class="tile" style="width:25%", bgcolor=#F4ABBA>${field.symbol === Symbol.NONE ? " " : "x"}</td>
        `;
    } else if (field.colour === TileColour.DARK) {
        return `
            <td class="tile" style="width:25%", bgcolor=#F2D5DB>${field.symbol === Symbol.NONE ? " " : "x"}</td>
        `;
    }
}

const state = new AppState();
const gameBoard = document.querySelector("#gameBoard");
state.init();
console.log(state.board);
state.checkRow();
state.checkColumn();
state.checkSquare();

/* -- winning row --
state.board[0][0].symbol = Symbol.CIRCLE;
state.board[0][1].symbol = Symbol.CIRCLE;
state.board[0][2].symbol = Symbol.CIRCLE;
state.board[0][3].symbol = Symbol.CIRCLE;

console.log(state.board);
state.checkRow();
state.checkColumn();
*/

/*// -- winning column --
state.board[0][0].symbol = Symbol.CIRCLE;
state.board[1][0].symbol = Symbol.CIRCLE;
state.board[2][0].symbol = Symbol.CIRCLE;
state.board[3][0].symbol = Symbol.CIRCLE;

console.log(state.board);
state.checkRow();
state.checkColumn();
*/

/*// -- winning square --
state.board[0][2].symbol = Symbol.CIRCLE;
state.board[1][2].symbol = Symbol.CIRCLE;
state.board[0][3].symbol = Symbol.CIRCLE;
state.board[1][3].symbol = Symbol.CIRCLE;

console.log(state.board);
state.checkRow();
state.checkColumn();
state.checkSquare();
*/

gameBoard.innerHTML = render(state);

/*  TODO:
    - check row
    - check column
    - check square
    - store last player
    - display player's turn
    - display available tiles
*/




/*
const TILE_SIZE = 50;
const TILE_A_COLOR = "rgb(244, 171, 186)";
const TILE_B_COLOR = "rgb(242, 213, 219)";
const HIGHLIGHT_COLOR = "rgb(234, 89, 110)";
const GREEN = 0;
const YELLOW = 1;

const piecesCharacters = {
    0: '■',
    1: '⬤',
    2: '▲',
    3: '+',
};*/