
let emptyR = 2;
let emptyC = 2;



var moveTile = function (tile, i, j) {
    var row = i;
    var col = j;
  
    //when a tile is clicked
    return function () {
      var rOffset = Math.abs(emptyR - row);
      var cOffset = Math.abs(emptyC - col);
  
      //if possible move tile to empty space
      if (rOffset == 1 && cOffset == 0 || rOffset == 0 && cOffset == 1) {
        tile.style.marginLeft = emptyC * 200 + 'px';
        tile.style.marginTop = emptyR * 200 + 'px';
        //swap coordinates
        [row, emptyR] = [emptyR, row];
        [col, emptyC] = [emptyC, col];
      }
    }
  };
  
  var shuffle = function () {
    var rows = document.querySelectorAll('.row');
    for (let i = 0; i < 85; ++i) {
      var row = ~~(Math.random() * rows.length);
      var tiles = rows.item(row).querySelectorAll('.tile');
      var tile = ~~(Math.random() * tiles.length);
      tiles.item(tile).click();
    }
  };
  
  var initTiles = function () {
    //get all rows
    var rows = document.querySelectorAll('.row');
  
    //iterate thru rows
    for (let i = 0; i < rows.length; ++i) {
      var row = rows.item(i);
  
      //go thru each tile on each row
      var tiles = row.querySelectorAll('.tile');
      for (let j = 0; j < tiles.length; ++j) {
        var tile = tiles.item(j);
  
        //add the click response to tile
        tile.addEventListener('click', moveTile(tile, i, j));
  
        //set tile locations
        tile.style.marginLeft = j * 200 + 'px';
        tile.style.marginTop = i * 200 + 'px';
  
        // set what part of image will show on tile
        tile.style.backgroundPosition = `${600 - j * 200}px ${600 - i * 200}px`;
      }
    }
  };
  
  initTiles();
  shuffle();