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
                this.map[row][col].painted = false;

                // TODO this should be removed from here,
                // and be called recursively in this.init() until all the mines set in this.mines_number property
                // are filled.
                this.addMine(this.map[row][col]);
            }
        }
    }

    checkWin() {
        for (var row = 0; row < this.columns; row++) {
            for (var col = 0; col < this.rows; col++) {
                if (this.map[row][col].painted == false && this.map[row][col].mine == false) {
                    console.log(this.map[row][col])
                    return false
                }
            }
        }
        return true
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
            console.log("mina" + square.row + square.col);
            this.mines_to_set--;
            //this.paintMines(square);
        }
    }

    /**
     * Counts the amount of mines which are sorrouding the square we are clicking 
     * and draws the number in the current square.
     * It keeps being called recursively for every square which has no mines
     * @param {Object} square DOM div element 
     */
    countCloseMines(square) {
        if (square.painted) {
            return
        }

        let nMines = 0;
        let closeSquares = this.createCloseSquareMap(square);

        for (let [key, square] of closeSquares) {
            //console.log(square);
            if (square.mine == true) {
                nMines++
            }
        }

        square.nMines = nMines;

        this.squareDraw(square);

        if (square.nMines == 0) {
            //debugger;
            for (let [key, closeSquare] of closeSquares) {
                if (closeSquare.painted) {
                    continue
                }
                if (this.isDiagonal(square, closeSquare) && closeSquares.nMines == 0) {
                    continue
                }
                this.countCloseMines(closeSquare);
            }
        }
    }

    /**
     * create a map with the close squares of each square
     * @returns Map closeSquares
     */
    createCloseSquareMap(square) {
        let closeSquares = new Map();

        if (square.row == 0 && square.col == 0) {
            // up_left corner
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1]);
            closeSquares.set("down_center", this.map[square.row + 1][square.col]);
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1]);
        }

        if (square.row == this.rows - 1 && square.col == this.columns - 1) {
            // down_rigth corner
            closeSquares.set("center_left", this.map[square.row][square.col - 1]);
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1]);
            closeSquares.set("up_center", this.map[square.row - 1][square.col]);
        }

        if (square.row == this.rows - 1 && square.col == 0) {
            // down_left corner
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1]);
            closeSquares.set("up_center", this.map[square.row - 1][square.col]);
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1]);
        }

        if (square.row == 0 && square.col == this.columns - 1) {
            // up_rigth corner
            closeSquares.set("down_center", this.map[square.row + 1][square.col]);
            closeSquares.set("center_left", this.map[square.row][square.col - 1]);
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1]);
        }

        if (square.row == 0 && square.col < this.columns - 1 && square.col > 0) {
            // mid_up row
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1]);
            closeSquares.set("center_left", this.map[square.row][square.col - 1]);
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1]);
            closeSquares.set("down_center", this.map[square.row + 1][square.col]);
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1]);
        }

        if (square.row == this.rows - 1 && square.col < this.columns - 1 && square.col > 0) {
            // mid_down row
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1]);
            closeSquares.set("center_left", this.map[square.row][square.col - 1]);
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1]);
            closeSquares.set("up_center", this.map[square.row - 1][square.col]);
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1]);
        }

        if (square.col == 0 && square.row < this.rows - 1 && square.row > 0) {
            // mid_left col
            closeSquares.set("up_center", this.map[square.row - 1][square.col]);
            closeSquares.set("down_center", this.map[square.row + 1][square.col]);
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1]);
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1]);
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1]);
        }

        if (square.col == this.columns - 1 && square.row < this.rows - 1 && square.row > 0) {
            // mid_rigth col
            closeSquares.set("up_center", this.map[square.row - 1][square.col]);
            closeSquares.set("down_center", this.map[square.row + 1][square.col]);
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1]);
            closeSquares.set("center_left", this.map[square.row][square.col - 1]);
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1]);
        }

        if (square.col < this.columns - 1 && square.col > 0 && square.row < this.rows - 1 && square.row > 0) {
            // inner squares
            closeSquares.set("up_left", this.map[square.row - 1][square.col - 1]);
            closeSquares.set("up_center", this.map[square.row - 1][square.col]);
            closeSquares.set("up_rigth", this.map[square.row - 1][square.col + 1]);
            closeSquares.set("center_rigth", this.map[square.row][square.col + 1]);
            closeSquares.set("center_left", this.map[square.row][square.col - 1]);
            closeSquares.set("down_left", this.map[square.row + 1][square.col - 1]);
            closeSquares.set("down_center", this.map[square.row + 1][square.col]);
            closeSquares.set("down_rigth", this.map[square.row + 1][square.col + 1]);
        }
        return closeSquares;
    }


    isDiagonal(square1, square2) {
        if (square1.row != square2.row && square1.col != square2.col) {
            return true
        }
        return false
    }

    /**
     * Draws the number of close mines in the square
     * @param {Object} square DOM div element 
     */
    squareDraw(square) {
        //if (square.nMines==0){
        square.innerHTML = square.nMines;
        square.painted = true;
    }

    /**
     * JUST FOR DEBUGGING. TO BE REMOVED
     */
    paintMines(square) {
        square.style.backgroundColor = "red";
    }

    /**
     * Calculates what the board width should be.
     * Each square is set to be 20 px in the stylesheed, and it has 1px margin on each side
     * hence the 22px
     */
    calculateBoardWidth() {
        this.board.style.width = this.columns * 22 + "px";
    }

    win() {
        alert("u´ve won");
    }
    lose() {
        alert("u´ve lost");
    }

    /**
     * Adds all the event listeners to the squares in the board to capture
     * the player's interactions
     */
    play() {

        for (var x = 0; x < this.columns; x++) {
            for (var y = 0; y < this.rows; y++) {
                const square = this.map[x][y];

                square.addEventListener("mousedown", (e) => {
                    if (e.which == 1) {
                        if (square.mine) {
                            square.innerHTML = "*";
                            this.lose();
                        } else {
                            this.countCloseMines(square);
                            if (this.checkWin(square)) {
                                this.win();
                            }
                        }
                    }
                    if (e.which == 3) {
                        this.paintMines(square);
                    }

                });
            }
        }
    }
}

const buscaminas = new Buscaminas(10, 10, 10);
buscaminas.init();