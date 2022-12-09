//Unscramble Buzz
//By Katherine McNeice(Game Mechanic Implementation), Owen Mason(Game Mechanic Implementation)
//Jimmy Liu(UI Design), Alistair Enoch(UI Design)
//Nathan Weber(Game Mechanic Implementation and UI Design)
let emptyR = 2;
let emptyC = 2;
scaledTileSize = 200;
let movesCounter = 0;
let tileGrid = [];
let correctTiles = [];
let gameRunning = false;
let level = 3;
let nextButton = document.getElementById("nextButton");
let levelBeaten = false;

var moveTile = function (tile, i, j) {
    var row = i;
    var col = j;
  
    //when a tile is clicked
    return function () {
      console.log(correctTiles[0][0]);
      var rOffset = Math.abs(emptyR - row);
      var cOffset = Math.abs(emptyC - col);
  
      //if possible move tile to empty space
      if (rOffset == 1 && cOffset == 0 || rOffset == 0 && cOffset == 1) {
        movesCounter++;
        tile.style.marginLeft = emptyC * scaledTileSize + 'px';
        tile.style.marginTop = emptyR * scaledTileSize + 'px';
        //swap coordinates
        [row, emptyR] = [emptyR, row];
        [col, emptyC] = [emptyC, col];

        //track swap in tileGrid for victory condition
        var temp = tileGrid[emptyR][emptyC];
        tileGrid[emptyR][emptyC] = tileGrid[row][col];
        tileGrid[row][col] = temp;

        if (gameRunning && checkVictory()) {
          alert("Congradulations, you completed the puzzle in " + movesCounter + " moves!");
          nextButton.innerHTML = "Next Level!";
          nextButton.classList.add('nextLevelEnabled');
          levelBeaten = true;

        }
        
      }
    }
  };

//determines if all the tiles are in the correct place
function checkVictory() {
  console.log(correctTiles[0][0]);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (tileGrid[i][j] != correctTiles[i][j]) {
        return false;
      }
    }
  }
  console.log(correctTiles[0][0]);
  return true;
};
  
  function shuffle() {
    gameRunning = false;
    var rows = document.querySelectorAll('.row');
    for (let i = 0; i < level*50; ++i) {
      var row = ~~(Math.random() * rows.length);
      var tiles = rows.item(row).querySelectorAll('.tile');
      var tile = ~~(Math.random() * tiles.length);
      tiles.item(tile).click();
    }
    movesCounter = 0;
    gameRunning = true;
  };

  function initTilesScalable(difficulty) {
    //Indentify the puzzle div
    var puzzle = document.querySelector('.puzzle');

    
    //create rows in puzzle div
    for (var i = 0; i < difficulty; i++) {
      var row = document.createElement("div");
      row.classList.add("row");
      puzzle.appendChild(row);
    }


    //get all rows
    var rows = document.querySelectorAll('.row');

    

    //interate through rows to add tiles
    for (let i = 0; i < rows.length; ++i) {
      var row = rows.item(i);
      for (let k = 0; k < difficulty; k++) {
        if (!(i == difficulty - 1 && k == difficulty - 1)) {
          var tile = document.createElement("div");
          tile.classList.add("tile");
          row.appendChild(tile);
        }
      }
    } 

    //scale global position values for difficulty
    scaledTileSize = 600/difficulty;
    emptyC = difficulty - 1;
    emptyR = difficulty - 1;
    
  
    //iterate thru rows and tiles to add images to tiles
    for (let i = 0; i < rows.length; ++i) {
      var row = rows.item(i);

      var tiles = row.querySelectorAll('.tile');
      //go thru each tile on each row
      for (let j = 0; j < tiles.length; ++j) {
        
        var tile = tiles.item(j);

        tile.style.width = (scaledTileSize - 1) + "px";
        tile.style.height = (scaledTileSize -1) + "px";

        //add the click response to tile
        tile.addEventListener('click', moveTile(tile, i, j));

        //set tile locations
        tile.style.marginLeft = j * scaledTileSize + 'px';
        tile.style.marginTop = i * scaledTileSize + 'px';
  
        // set what part of image will show on tile
        tile.style.backgroundPosition = `${600 - j * scaledTileSize}px ${600 - i * scaledTileSize}px`;
      }
    }
  };


  var generateCorrectPattern = function (size) {
    var grid = [];
    for (var i = 0; i < size; i++) {
      var temprow = [];
      for (var k = 0; k < size; k++) {
        temprow[k] = k + 1 + i * size;
      }
      grid[i] = temprow;
    }
    return grid;
  }

  var nextLevel = function() {
    return function() {
      if(levelBeaten) {
        level++;
        clearTiles();
        initializeGame();
        nextButton.innerHTML = "Locked";
        nextButton.classList.remove('nextLevelEnabled');
        levelBeaten = false;
      }
    }
    
    
  }


  function clearTiles() {
    var tiles = document.querySelectorAll('.tile');
    for (var i = 0; i < tiles.length; i++) {
      tiles.item(i).remove();
    }
    var rows = document.querySelectorAll('.row');
    for (var i = 0; i < rows.length; i++) {
      rows.item(i).remove();
    }
  }

  
  function initializeGame() {
    //currently commented out this stuff b/c it doesnt work
    //var restartButtton = document.querySelector('.button1');
    //restartButtton.addEventListener('click', shuffle());
    
    tileGrid = generateCorrectPattern(level);
    correctTiles = generateCorrectPattern(level);
    console.log(correctTiles[0][0]);
    initTilesScalable(level);
    shuffle();
  }



//generateCorrectPattern(4);
nextButton.addEventListener('click', nextLevel());
initializeGame();