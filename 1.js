class Buscaminas {
    constructor(rows, columns, mines_number) {
        this.rows = rows;
        this.columns = columns;
        this.mines_number = mines_number;
        this.board = document.querySelector("#buscaminas");
        this.mines_to_set = this.mines_number
        this.map = [];
    }

    init() {
        this.calculateBoardWidth();
        this.fillBoard();
        this.play();
    }

    fillBoard() {
        for (var x = 0; x < this.columns; x++) {
            this.map[x] = document.createElement('div');
            this.board.appendChild(this.map[x]);

            for (var y = 0; y < this.rows; y++) {
                this.map[x][y] = document.createElement('div');
                this.map[x].appendChild(this.map[x][y]);
                this.addMine(this.map[x][y]);
                this.map[x][y].x = x;
                this.map[x][y].y = y;
            }
        }
    }

    addMine(square) {

        if (this.mines_to_set = 0) {
            return
        }
        if (Math.floor(Math.random() * (this.mines_number - 1)) + 1 === 0) {
            square.mine = true;
        } else {
            square.mine = false;
        }
        this.mines_to_set--;
    }

    closeMines(square) {
        //minas de alrededor
        let mines = new Map() 
            mines.up_left = this.map[square.x - 1][square.y - 1]
            mines.up_center = this.map[square.x][square.y - 1]
            mines.up_rigth = this.map[square.x + 1][square.y - 1]
            mines.center_left = this.map[square.x - 1][square.y]
            mines.center_rigth = this.map[square.x + 1][square.y]
            mines.down_left = this.map[square.x - 1][square.y + 1]
            mines.down_center = this.map[square.x][square.y + 1]
            mines.down_rigth = this.map[square.x + 1][square.y + 1]
        
        let nm=0;
        for (const iterator of mines) {    
            if (iterator.mine==true){
                nm++
            }
        }

        square.nm=nm;

        this.squareDraw(square);

        if (square.nm==0){
            for (const iterator of mines) {
                this.closeMines(iterator);
            }
        } 
        
    }

    squareDraw(square){
        //if (square.nm==0){
        square.innerHTML=square.nm;
        
    }

    calculateBoardWidth() {
        this.board.style.width = this.columns * 22 + "px";
    }

    play() {

        for (var x = 0; x < this.columns; x++) {
            for (var y = 0; y < this.rows; y++) {
                const square = this.map[x][y];
                square.addEventListener("click", () => {
                    console.log("play");
                    if (square.mine) {
                        //this.lost();
                    } else {
                        this.closeMines(square);
                    }
                });
            }
        }
    }
}
const buscaminas = new Buscaminas(10, 10, 10);
buscaminas.init();