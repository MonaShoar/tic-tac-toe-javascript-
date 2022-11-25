//Each item can be 0(empty) , 1(player one), 2(player two)
const boardState = [
    null, null, null,
    null, null, null,
    null, null, null
];
// The win condition array
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];


//The active Player
let activePlayer = 0;


//cells
const cells = document.querySelectorAll("td");



//add event listener to call
cells.forEach(function (cell, index) {
    cell.dataset.index = index;
    cell.onmouseover = function () {
        cell.style.backgroundColor = "#ccc";
        cell.style.transition = "1s";
    }
    cell.onmouseout = function () {
        cell.style.backgroundColor = "#fff";
    }
    cell.addEventListener("click", clicked)

});



///clicked function definition    
function clicked(event) {
    const index = Number(event.target.dataset.index);
    const letter = activePlayer ? "o" : "x";
    const cell = event.target;
    cell.textContent = letter;
    boardState[index] = activePlayer;


    cell.removeEventListener("click", clicked);
    cell.onmouseover = null;
    if (hasWon()) {
        window.location = "./winner.html";
    }
    if (hasDrawn()) {
        window.location = "./draw.html";
    }


    activePlayer = activePlayer ? 0 : 1;

}


//The winner detector
function hasWon() {
    for (const condition of winConditions) {
        const boardValues = condition.map(function (item) {
            return boardState[item];
        });
        const playerPieces = boardValues.filter(function (item) {
            return item === activePlayer;
        });
        if (playerPieces.length === 3) return true;

    }
    return false;
    function hasDrawn() {
        const boardCapacity = boardState.filter(function (item) {
            return item !== null;
        });
        return boardCapacity.length === boardState.length;
    }

}

const again = document.querySelector("#again");
if (again) {
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}