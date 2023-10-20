var board, prevboard;
var score = 0;
var rows = 4;
var cols = 4;
const tileColors = {
    0: "#ccc1b4",      // White
    2: "#F5F5F5",    // Light gray
    4: "#EDE0C8",    // Light brown
    8: "#FF5722",    // Dark orange
    16: "#E91E63",   // Dark pink
    32: "#FF4081",   // Bright pink
    64: "#9C27B0",   // Purple
    128: "#673AB7",  // Deep purple
    256: "#3F51B5",  // Indigo
    512: "#03A9F4",  // Light blue
    1024: "#06437a",  // Blue
    2048: "#00BCD4"  // Cyan
  };


window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile)
        }
    }

    prevboard = board.map((row) => row.slice());
    addTile();
    addTile();
}


// use after the board is updated
function addTile(){
    let emptyTiles = [];
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(board[r][c] == 0){
                // let tile = document.getElementById(r.toString() + "-" + c.toString());
                emptyTiles.push([r, c]);
            }
        }
    }

    if(emptyTiles.length == 0){
        return;
    }

    let randIndex = Math.floor(Math.random() * emptyTiles.length);
    let r = emptyTiles[randIndex][0], c = emptyTiles[randIndex][1];
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    let val = Math.random() > 0.25 ? 2 : 4;
    board[r][c] = val;
    updateTile(tile, val);
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile")
    if(num > 0){
        tile.innerText = num.toString();
    }
    tile.style.setProperty("--tileColor", tileColors[num])
}

function updateBoard(){
    // console.log(prevboard, board);
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function isBoardChanged(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            if(prevboard[r][c] != board[r][c]){
                return true;
            }
        }
    }
    return false;
}

document.addEventListener("keyup", (e) => {
    switch(e.code){
        case "ArrowLeft":
            slideLeft();
            break;
        case "ArrowRight":
            slideRight();
            break;
        case "ArrowUp":
            slideUp();
            break;
        case "ArrowDown":
            slideDown();
            break;
    }
    
    if(isBoardChanged()){
        addTile();
        prevboard = board.map((row) => row.slice());;
    }
    document.getElementById("score").innerText = score;
})

function slide(a){
    a = a.filter(num => num != 0);

    for(let i = 0; i < a.length-1; i++){
        if(a[i] == a[i+1]){
            score += a[i];
            a[i] *= 2;
            a[i+1] = 0;
        }
    }

    a = a.filter(num => num != 0);

    while(a.length != rows){
        a.push(0);
    }

    return a;
}

function slideLeft(){
    for(let r = 0; r < rows; r++){
        let arr = [board[r][0], board[r][1], board[r][2], board[r][3]];
        arr = slide(arr);
        board[r] = arr;
    }
    updateBoard();
}

function slideRight(){
    for(let r = 0; r < rows; r++){
        let arr = [board[r][3], board[r][2], board[r][1], board[r][0]];
        arr = slide(arr);
        board[r] = arr.reverse();
    }
    updateBoard();
}

function slideUp(){
    for(let c = 0; c < cols; c++){
        let arr = [board[0][c], board[1][c], board[2][c], board[3][c]];
        arr = slide(arr);
        board[0][c] = arr[0];
        board[1][c] = arr[1];
        board[2][c] = arr[2];
        board[3][c] = arr[3];
    }
    updateBoard();
}

function slideDown(){
    for(let c = 0; c < cols; c++){
        let arr = [board[3][c], board[2][c], board[1][c], board[0][c]];
        arr = slide(arr);
        board[0][c] = arr[3];
        board[1][c] = arr[2];
        board[2][c] = arr[1];
        board[3][c] = arr[0];
    }
    updateBoard();
}
