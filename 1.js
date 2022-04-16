class Buscaminas {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
    }

    init() {
        this.fillBoard();
        this.addMines();
    }

    fillBoard() {
        let board = document.querySelector("#buscaminas");
        
        for (let r=0;r<bc.rows;r++){
            let row = document.createElement("div");
            board.appendChild(row);
            for(let c=0;c<bc.columns;c++){
                let column = document.createElement("div");
                row.appendChild(column);
            }
        }
    }

    addMines() {
        // TODO Add mines in random places to board
    }
}

Buscaminas.init(10, 10);