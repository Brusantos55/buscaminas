class Buscaminas {
    constructor(rows, columns, mines_number) {
        this.rows = rows;
        this.columns = columns;
        this.mines_number = mines_number;
        this.board = document.querySelector("#buscaminas");
        this.mines_to_set = this.mines_number
        this.map = [];
    }

    /**
     * Builds, fills the board and adds the event listeners
     * so that we are ready to play
     */
    init() {
        this.calculateBoardWidth();
        this.fillBoard();
        this.play();
    }

    /**
     * Creates a matrix of divs and fills the board container with them
     */
    fillBoard() {
        
        for (var row = 0; row < this.columns; row++) {
            this.map[row] = document.createElement('div');
            this.board.appendChild(this.map[row]);

            for (var col = 0; col < this.rows; col++) {
                this.map[row][col] = document.createElement('div');
                this.map[row].appendChild(this.map[row][col]);
                this.map[row][col].row = row;
                this.map[row][col].col = col;
                this.map[row][col].mine = false;

                // TODO this should be removed from here,
                // and be called recursively in this.init() until all the mines set in this.mines_number property
                // are filled.
                this.addMine(this.map[row][col]);
            }
        }
    }

    /**
     * Random chance of setting a mine in a square based on the amount of mines we have. 
     * @param {Object} square DOM div element 
     * @returns 
     */
    addMine(square) {
    
        if (this.mines_to_set == 0) {
            return
        }

        if (Math.floor(Math.random() * (this.mines_number - 1)) + 1 === 1) {
            square.mine = true;
            console.log("mina"+square.row+square.col);
            this.paintMines(square);
            this.mines_to_set--;
        }   
    }

    /**
     * Counts the amount of mines which are sorrouding the square we are clicking and draws the number
     * in the current square.
     * It keeps being called recursively for every square which has no mines
     * @param {Object} square DOM div element 
     */
    countCloseMines(square) {
        let closeSquares = new Map() 

        if (square.row==0 && square.col==0) {
            // up_left corner
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1])
            closeSquares.set("down_center", this.map[square.row + 1][square.col])
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1])
        }

        if (square.row==this.rows-1 && square.col==this.columns-1){
            // down_rigth corner
            closeSquares.set("center_left", this.map[square.row][square.col - 1])
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1])
            closeSquares.set("up_center", this.map[square.row - 1][square.col])
        }

        if (square.row==this.rows-1 && square.col==0) {
            // down_left corner
            closeSquares.set("center_rigth", this.map[square.row][square.col +1])
            closeSquares.set("up_center", this.map[square.row - 1][square.col])
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1])
        }

        if (square.row==0 && square.col==this.columns-1) {
            // up_rigth corner
            closeSquares.set("down_center", this.map[square.row + 1][square.col])
            closeSquares.set("center_left", this.map[square.row][square.col - 1])
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1])
        }

        if (square.row==0 && square.col<this.columns-1 && square.col>0) {
            // mid_up row
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1])
            closeSquares.set("center_left", this.map[square.row][square.col - 1])
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1])
            closeSquares.set("down_center", this.map[square.row + 1][square.col])
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1])
        }

        if (square.row==this.rows-1 && square.col<this.columns-1 && square.col>0) {
            // mid_down row
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1])
            closeSquares.set("center_left", this.map[square.row][square.col - 1])
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1])
            closeSquares.set("up_center", this.map[square.row - 1][square.col])
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1])
        }

        if (square.col==0 && square.row<this.rows-1 && square.row>0) {
            // mid_left col
            closeSquares.set("up_center", this.map[square.row - 1][square.col])
            closeSquares.set("down_center", this.map[square.row + 1][square.col])
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1])
            closeSquares.set("center_rigth", this.map[square.row][square.col +1])
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1])
        }

        if (square.col==this.columns-1 && square.row<this.rows-1 && square.row>0) {
            // mid_rigth col
            closeSquares.set("up_center", this.map[square.row - 1][square.col])
            closeSquares.set("down_center", this.map[square.row + 1][square.col])
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1])
            closeSquares.set("center_left", this.map[square.row][square.col - 1])
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1])
        }

        if (square.col<this.columns-1 && square.col>0 && square.row<this.rows-1 && square.row>0) {
            // inner squares
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1])
            closeSquares.set("up_center", this.map[square.row - 1][square.col])
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1])
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1])
            closeSquares.set("center_left", this.map[square.row][square.col - 1])
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1])
            closeSquares.set("down_center", this.map[square.row + 1][square.col])
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1])
        }

        let nMines = 0;
        
        for (let [key, square] of closeSquares) {
            console.log(square);
            if (square.mine==true){
                nMines++
            }
        }

        square.nMines = nMines;

        this.squareDraw(square);

        // TODO fix the bug that creates the infinite loop.
        // probably it is because we have two squares with 0 mines next to each other
        // so they get infinitely added to each others closeSquares Map.
        // It may be fixed by passing the previous square as a second param in this function
        // and skipping that square in the for loop below

        // if (square.nMines==0){
        //     for (const iterator of mines) {
        //         this.countCloseMines(iterator);
        //     }
        // } 
    }

    /**
     * Draws the number of close mines in the square
     * @param {Object} square DOM div element 
     */
    squareDraw(square) {
        //if (square.nMines==0){
        square.innerHTML = square.nMines; 
    }

    /**
     * JUST FOR DEBUGGING. TO BE REMOVED
     */
    paintMines(square)
    {
        square.style.backgroundColor="red";
    }

    /**
     * Calculates what the board width should be.
     * Each square is set to be 20 px in the stylesheed, and it has 1px margin on each side
     * hence the 22px
     */
    calculateBoardWidth() {
        this.board.style.width = this.columns * 22 + "px";
    }

    /**
     * Adds all the event listeners to the squares in the board to capture
     * the player's interactions
     */
    play() {

        for (var x = 0; x < this.columns; x++) {
            for (var y = 0; y < this.rows; y++) {
                const square = this.map[x][y];
                square.addEventListener("click", () => {
                    console.log("play");
                    if (square.mine) {
                        this.paintMines(square);
                        //this.lost();
                    } else {
                        this.countCloseMines(square);
                    }
                });
            }
        }
    }
}

const buscaminas = new Buscaminas(10, 10, 10);
buscaminas.init();