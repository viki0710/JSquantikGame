/* ALL THE VARIABLES PRESET GOES HERE */
const BOARD_SIZE = 4;

const TileColour = {
    LIGHT: "light",
    DARK: "dark"
};

const Symbols = {
    NONE: "",
    SQUARE: "square",
    TRIANGLE: "triangle",
    CIRCLE: "circle",
    PLUS: "plus"
};

var Players = {
    EMPTY: "",
    P1: {ID: "p1", NAME: "", INVENTORY: []},
    P2: {ID: "p2", NAME: "", INVENTORY: []}
};

// these get initialized in the init()
var gameBoard;
var system;

/* ALL THE CLASSES GOES HERE */
class Tile {
    constructor(id, colour=TileColour.LIGHT){
        this.id = id;
        this.colour = colour;
        this.symbol = Symbol.NONE;
        this.playerId = Players.EMPTY;
        this.box = undefined;
        this.row = undefined;
        this.col = undefined;
    }

    setRow(elems){ this.row = elems }
    setCol(elems){ this.col = elems }
    setBox(elems){ this.box = elems }
    setPlayer(pid){ this.playerId = pid }
}

class Symbol {
    stock; shape;
    constructor(smbl){
        this.stock = 2;
        this.shape = smbl;
    }
}

class GameSystem {
    board; currentPlayerId; standbyPlayerId; boardElement;
    constructor(){
        /* INIT FOR THE GAME BOARD */
        this.boardElement = document.getElementById("gameBoard");
        this.board = [];
        //for each of the board size
        for(let y = 0; y < BOARD_SIZE; y++){
            this.board.push([]);
            
            //create the board
            for(let x = 0; x < BOARD_SIZE; x++){
                //set colour
                var colour;
                if((x >= 2 && y >= 2) || (x < 2 && y < 2))
                    colour = TileColour.LIGHT;
                else colour = TileColour.DARK;
                var t = new Tile(y+""+x, colour);
                t.setRow(numArray(BOARD_SIZE).map(v => y+""+v));
                t.setCol(numArray(BOARD_SIZE).map(v => v+""+x));
                var [iy, ix] = [y%2 == 0 ? y : y-1, x%2 == 0 ? x : x-1];
                t.setBox(numArray(iy, iy+2).map(v => numArray(ix, ix+2).map(x => v+""+x)));
                this.board[y][x] = t;
            }
        }
        this.append();

        /* INIT FOR THE CHARACTER HANDLING SYSTEM */
        this.changeTurn();

        /* INIT FOR THE SYMBOLS */
        Object.entries(Players).forEach(([p, attr]) => {
            if(p != "EMPTY"){
                Object.entries(Symbols).forEach(([shapeName, shape]) => {
                    if(shapeName != "NONE") Players[p].INVENTORY.push(new Symbol(shape));
                });
            }
        });
        this.showSymbolMenu();
    }

    changeTurn(){
        if(!this.currentPlayerId) this.currentPlayerId = Math.round(Math.random()) == 1 ? Players.P1.ID : Players.P2.ID;
        else this.currentPlayerId = this.currentPlayerId == Players.P1.ID ? Players.P2.ID : Players.P1.ID;
        this.standbyPlayerId = this.currentPlayerId == Players.P1.ID ? Players.P2.ID : Players.P1.ID;
        this.showcurrentPlayerId();

        if(this.currentTile){
            this.currentTile.element.classList.remove("highlight");
            document.getElementById("playerInfo").classList.remove("grayscale");
        }
        document.getElementById(this.currentPlayerId+"Box").classList.add("grayscale");
        document.getElementById(this.standbyPlayerId+"Box").classList.add("grayscale");
        

        // this.boardElement.classList.remove("no-select");
        this.currentTile = undefined;
        this.removeHoverableShapes();

        
    }

    currentTile;
    //whenever a tile is clicked
    clickTile(tile, e){
        if(e.target.classList.contains("isHoverable")){
            console.log(tile, e);
            //if first time click in the turn or else...
            if(this.currentTile) this.currentTile.element.classList.remove("highlight");
            else{
                this.applyHoverableShapes();
                document.getElementById(this.currentPlayerId+"Box").classList.remove("grayscale");
                document.getElementById("playerInfo").classList.add("grayscale");
            }
            
            e.target.classList.add("highlight");

            // this.boardElement.classList.add("no-select");
            this.currentTile = {element: e.target, tile: tile};
            
        }
    }
    
    check(){
        console.log("check");
        return true;
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
        }
        //exit and display win
        console.log("is the game won: " + isWon);
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
        }
        //exit and display win
        console.log("is the game won: " + isWon);
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



    clickShape(shape, e){
        // console.log(shape, e);
        if(e.target.classList.contains("isHoverable") && this.currentTile != undefined){
            console.log(shape, e);
            //if consumable
            if(shape.stock >= 1){                
                shape.stock -= 1;
                var newElement = this.createSymbol(shape, false);
                this.currentTile.element.appendChild(newElement);
                this.currentTile.element.classList.add(this.currentPlayerId);
                this.currentTile.element.classList.remove("isHoverable");
                this.currentTile.tile.symbol = shape.shape;
                this.currentTile.tile.playerId = this.currentPlayerId;
                e.target.getElementsByClassName("symbolNumber")[0].innerHTML = shape.stock;

                //check win
                this.checkRow();
                this.checkColumn();
                this.checkSquare();

                this.changeTurn();
            }else{
                console.log("Out of stock...");
            }
        }
    }



    createSymbol(shape, status=true){
        var mother = document.createElement("div");
        mother.classList.add("shapes");
        var s = document.createElement("div");
        s.classList.add(shape.shape, "child", "no-select");
        if(status){
            var numberBox = document.createElement("div");
            numberBox.classList.add("symbolNumberBox", "flex");
            var span = document.createElement("span");
            span.classList.add("symbolNumber");
            span.innerHTML = shape.stock;
            numberBox.appendChild(span);
        }
        mother.appendChild(s);
        if(status) mother.appendChild(numberBox);
        return mother;
    }

    showSymbolMenu(){
        var players = [Players.P1, Players.P2];
        players.forEach(v => {
            v.INVENTORY.forEach(i => {
                // i.stock; i.shape;
                var mother = this.createSymbol(i, true);
                
                //click event
                mother.addEventListener('click', e => { this.clickShape(i, e) });

                //append
                document.getElementById(v.ID+"Shapes").appendChild(mother);
                // i.shape
            });
        });
    }

    showcurrentPlayerId(){
        document.getElementById(this.currentPlayerId).classList.remove("hide");
        document.getElementById(this.standbyPlayerId).classList.add("hide");
    }

    removeHoverableShapes(){
        var arr1 = document.getElementById(this.currentPlayerId+"Shapes").children;
        var arr2 = document.getElementById(this.standbyPlayerId+"Shapes").children;
        setTimeout(()=>{
            this.editHoverable("remove", arr1);
            this.editHoverable("remove", arr2);
        }, 100);
    }

    applyHoverableShapes(){
        this.removeHoverableShapes();
        var addArr = document.getElementById(this.currentPlayerId+"Shapes").children;
        setTimeout(()=>{ this.editHoverable("add", addArr) }, 100);
    }

    editHoverable(cond, arr){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].classList.contains("shapes")){
                if(cond == "add") arr[i].classList.add("isHoverable");
                else if(cond == "remove") arr[i].classList.remove("isHoverable");
                else console.log("Wrong cond...");
            }
        }
    }

    append(){
        gameBoard.appendChild(this.render(this.board));
    }

    render(){
        //make table
        var table = document.createElement("table");
        //make <tr>[]
        var rows = this.board.map(r => {
            var row = document.createElement("tr");
            row.style.height = 100 / BOARD_SIZE + "%";
            var elems = r.map(t => {
                var tile = document.createElement("td");
                tile.classList.add("tile", t.colour, "isHoverable");
                tile.style.width = 100 / BOARD_SIZE + "%";
                tile.addEventListener('click', e => { this.clickTile(t, e) });
                return tile;
            });
            //append <tr>[] to <td>
            elems.forEach(v => row.appendChild(v));
            return row;
        });
        //append <td>[] to <table>
        rows.forEach(rs => table.appendChild(rs));
        return table;
    }

}


/* ALL THE FUNCTIONS GO HERE */

function init(){
    gameBoard = document.querySelector("#gameBoard");
    system = new GameSystem();
}

function gameInit(){
    //sets the preset that goes after the name
    var preset = "'s turn! Please Place Your Item.";
    Players.P1.NAME = document.getElementById(Players.P1.ID+"NameInput").value;
    Players.P2.NAME = document.getElementById(Players.P2.ID+"NameInput").value;
    //changes the names
    document.getElementById(Players.P1.ID+"Name").innerHTML = Players.P1.NAME+preset;
    document.getElementById(Players.P2.ID+"Name").innerHTML = Players.P2.NAME+preset;
    document.getElementById(Players.P1.ID+"ShapesLabel").innerHTML = "<p class='big'>1. "+Players.P1.NAME+"</p>";
    document.getElementById(Players.P2.ID+"ShapesLabel").innerHTML = "<p class='big'>2. "+Players.P2.NAME+"</p>";

}

function numArray(offset, num){
    if(num == undefined) 
        return Array(offset).fill().map((x,i)=>i);
    else return Array(num-offset).fill().map((x,i)=>i+offset);
}

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

    if(id == "game") gameInit();
}

window.onload = init();