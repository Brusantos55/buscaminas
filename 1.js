console.log("js abierto");
debugger;

let bc = {
    rows: 10,
    columns: 10,
    alalala: function() {
        console.log("funcion abierta");
        let board = document.querySelector("#buscaminas");
        for(let r=0;r<bc.rows;r++){
            let row = document.createElement("div");
            board.appendChild(row);
            for(let c=0;c<bc.columns;c++){
                let column = document.createElement("div");
                row.appendChild(column);
            }
        }
    }    
};

bc.alalala();

console.log('fin');