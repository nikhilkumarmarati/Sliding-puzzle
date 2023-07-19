
function swapTiles(cell1,cell2) {
  var temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;
}

let moveCount = 0;
    
function incrementMoveCount() {
    moveCount++;
    document.getElementById("count").textContent = moveCount; // Update the move count display
  }


function clickTile(row,column) {
  var cell = document.getElementById("cell"+row+column);
  var tile = cell.className;
  if (tile!="tile9") { 
       //Checking if white tile on the right
       if (column<3) {
         if ( document.getElementById("cell"+row+(column+1)).className=="tile9") {
           swapTiles("cell"+row+column,"cell"+row+(column+1));
           incrementMoveCount(); // Increment the move count when a move is made
                return;
              }
         }
       
       //Checking if white tile on the left
       if (column>1) {
         if ( document.getElementById("cell"+row+(column-1)).className=="tile9") {
           swapTiles("cell"+row+column,"cell"+row+(column-1));
           incrementMoveCount(); // Increment the move count when a move is made
           return;
         }
       }
         //Checking if white tile is above
       if (row>1) {
         if ( document.getElementById("cell"+(row-1)+column).className=="tile9") {
           swapTiles("cell"+row+column,"cell"+(row-1)+column);
           incrementMoveCount(); // Increment the move count when a move is made
           return;
         }
       }
       //Checking if white tile is below
       if (row<3) {
         if ( document.getElementById("cell"+(row+1)+column).className=="tile9") {
           swapTiles("cell"+row+column,"cell"+(row+1)+column);
           incrementMoveCount(); // Increment the move count when a move is made
           return;
         }
       } 
  }
  }


document.addEventListener("DOMContentLoaded", function () {
  const timerDisplay = document.getElementById("timer");
  const startButton = document.getElementById("startbtn");
  const pauseButton = document.getElementById("pausebtn");
  const newGameButton = document.getElementById("newgamebtn");

  let startTime;
  let timerInterval;
  let elapsedTime = 0;
  let isTimerRunning = false;


  function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isTimerRunning = false;
    timerDisplay.textContent = "00:00";
    startButton.disabled = false;
    pauseButton.disabled = true;
    newGameButton.disabled = true;
  }

  function shuffle() {
    //Use nested loops to access each cell of the 3x3 grid
    for (var row=1;row<=3;row++) { //For each row of the 3x3 grid
       for (var column=1;column<=3;column++) { //For each column in this row
      
        var row2=Math.floor(Math.random()*3 + 1); //Pick a random row from 1 to 3
        var column2=Math.floor(Math.random()*3 + 1); //Pick a random column from 1 to 3
         
        swapTiles("cell"+row+column,"cell"+row2+column2); //Swap the look & feel of both cells
      } 
    } 
    }

    function resetMoveCount() {
      moveCount = 0; // Corrected variable name to moveCount
      document.getElementById("count").textContent = moveCount; // Update the move count display
      console.log("reseted!");
    }

    function resetTimerMovecountAndShuffle() {
      resetTimer();
      shuffle();
      resetMoveCount();
    }

  function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }


   // Function to resize the table based on the selected value in the drop-down menu
   function resizeTable() {
    const tableSizeSelect = document.getElementById("tableSize");
    const selectedSize = parseInt(tableSizeSelect.value, 10);

    // Validate the selected size (ensure it's either 3 or 4)
    if (selectedSize !== 3 && selectedSize !== 4) {
      return;
    }

    // Clear the existing puzzle cells
    document.getElementById("puzzle").innerHTML = "";

    // Generate new puzzle cells based on the selected size
    for (let row = 1; row <= selectedSize; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.setAttribute("id", "row" + row);
      rowDiv.style.display = "table-row";

      for (let column = 1; column <= selectedSize; column++) {
        const cellDiv = document.createElement("div");
        cellDiv.setAttribute("id", "cell" + row + column);
        cellDiv.setAttribute("class", "tile" + ((row - 1) * selectedSize + column));
        cellDiv.setAttribute("onClick", "clickTile(" + row + "," + column + ")");
        rowDiv.appendChild(cellDiv);
      }

      document.getElementById("puzzle").appendChild(rowDiv);
    }

    if (selectedSize == 4) {
      tile9=tile16;
      document.getElementsByClassName("tile9").style.backgroundImage = "url('images/number9.png')";
    }

    // Reset the timer, move count, and any other necessary game state
    resetTimer();
    resetMoveCount();
    // ... (other actions if needed) ...
  }

  // Attach the resizeTable function to the change event of the tableSize select element
  const tableSizeSelect = document.getElementById("tableSize");
  tableSizeSelect.addEventListener("change", resizeTable);

  

  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  newGameButton.addEventListener("click", resetTimerMovecountAndShuffle);
});



  
  
  
  
  
  
  