var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var screenWidth = 1280;
var screenHeight = 620;
var squareSize = 20;

var randomColour;

var counter = 0; // hue

var counterDark = 0;


var white = "#FFFFFF";

var red = "#FF0000";
var blue ="#0095DD";
var green = "#47B24B";
var yellow = "#FFEE03";
var purple = "#C405C4";


var colourArray=[red,blue,green,yellow,purple];

var redLight = "#FCA2A2";
var blueLight = "#8DDAFF";
var greenLight = "#9DF7A0";
var yellowLight = "#FFFAA9";
var purpleLight = "#E863E8";

var colourLightArray = [redLight,blueLight,greenLight,yellowLight,purpleLight];

var colourHueArray = ["red","orange","yellow","green","blue","purple","pink"];

var darkArray = ["bright","dark","normal"];

var numberPosArray = [];

var playField = [];
var playerArray = [];

var squareCounter ;

var initialized = false;

// Server socket code
var socket = io('/display');

socket.on ('updateGrid', function (grid) {

});

// Add user to game
socket.on('addUser', function(user){
    addPlayer(user);
});

socket.on('disconnect',function(user){

    var player = playerArray[user];
    removePlayer(player, user);
});

socket.on('changeDirection', function(user){
    playerArray[user.id].setDirection(user.direction);

});



function init() {
    if(initialized){
        return;
    }


    playField = [];
     for (i = 0; i < (screenWidth/squareSize); i++) {
         var objects = [];
         for (j = 0; j < (screenHeight/squareSize); j++) {
             objects.push(new Square(i * squareSize, j * squareSize, null));
         }
         playField.push(objects);
     }

     drawGrid(screenWidth, screenHeight);
     squareCounter = (screenWidth/squareSize) * (screenHeight/squareSize);
    initialized = true;
  //  drawHighScore();

}

// Square object
var Square = function (posX, posY, player) {
    this.posX = posX;
    this.posY = posY;
    this.player = player;

    this.drawSquare = function (colour) {
        ctx.beginPath();
        ctx.rect(this.posX + 1, this.posY + 1, squareSize-1, squareSize-1);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.closePath();
    };

    this.setPlayer = function(player){
      this.player = player;
    }

    this.getPlayer = function(){
        return this.player;
    }
};

// Player object
var Player = function (column, row, direction, colour, colourLight) {
    this.column = column;
    this.row = row;
    this.direction = direction;
    this.colour = colour;
    this.colourLight = colourLight;
    this.flicker = false;


    this.getColumn = function(){
      return this.column;
    }
    this.setColumn = function(column){

      return this.column = column;
    }
    this.getRow = function(){
      return this.row;
    }
    this.setRow = function(row){

      return this.row = row;
    }
    this.getColour = function (){
        return this.colour;
    };
    this.getColourLight = function (){
      return this.colourLight;
    }

    this.setDirection = function (direction) {
        return this.direction = direction;
    };
    this.getPosition = function () {
        return [this.row, this.column];
    };


    this.setSocketId = function(socketId){
        this.socketId = socketId;
    };

    this.getSocketId = function(socketId){
        this.socketId = socketId;
    };
    this.hasFlicker = function (){

          if(this.flicker){
              this.flicker = false;
          }else{
            this.flicker = true;
          }

        return this.flicker;

    }
    this.move = function (){
        // Draw light
        this.draw(this.colourLight);

        // Move player
        if(this.direction == 0){
            this.moveUp();
        }

        if(this.direction == 1){
            this.moveRight();
        }

        if(this.direction == 2){
            this.moveDown();
        }

        if(this.direction == 3){
            this.moveLeft();
        }
        if(this.direction == -1){
        if(this.hasFlicker()){
          this.draw(this.colour);
        }

    }else {
      this.draw(this.colour);
    }
    };
    this.moveUp = function (){
        this.row--;
        if (this.row <= -1) {
            this.row = (screenHeight/squareSize) -1;
        }
    };
    this.moveRight = function (){
        this.column++;
        if(this.column >=(screenWidth/squareSize)){
            this.column = 0;
        }
    };
    this.moveDown = function (){
        this.row++;
        if(this.row >(screenHeight/squareSize)-1){
            this.row = 0;
        }
    };
    this.moveLeft = function (){
        this.column--;
        if(this.column <=-1){
            this.column = (screenWidth/squareSize)-1;
        }
    };
    this.draw = function (color){
        drawSquare(color, this);
    }
};

// Game functions
function drawGrid(gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;

    myCanvas.width = gridX += 1;
    myCanvas.height = gridY += 1;

    // Vertical grid lines
    for (var x = 0.5; x < gridX + 1; x += squareSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, gridY);
    }

    // Horizontal grid lines
    for (var y = 0.5; y < gridY + 1; y += squareSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(gridX, y);
    }

    ctx.strokeStyle = "#F2F2F2";

    ctx.stroke();

}



function removePlayer(player, socketId){
    drawSquare(player.getColourLight(), player);
    delete playerArray[socketId];
    delete playerArray[undefined];
}

function addPlayer(user){
    var row = Math.floor((Math.random() * (screenHeight/squareSize)));
    var column = Math.floor((Math.random() * (screenWidth/squareSize)));

    var colourIndex = Math.floor((Math.random() * 4));
//  var myColour = colourArray[colourIndex];
//  var myColourLight = colourLightArray[colourIndex];
     var myColour = getRandomColorHue(colourHueArray[counter],darkArray[counterDark]);
  //  var myColour = getRandomColorHue();
     var myColourLight = getLighterColor(myColour, 30);
      counter += 1;



    var player = new Player(column, row, -1, myColour,myColourLight);

    player.setSocketId(user.socketId);
    playerArray[user.socketId] = player;

    socket.emit('playerColor', myColour);

    if(counter == 7){
      counter = 0;
      counterDark +=1;
    }
    if(counterDark == 3){
      counterDark = 0;
    }
    player.setSocketId(user);
    playerArray[user] = player;
}

function movePlayers(){
    for(var id in playerArray) {
        if (playerArray.hasOwnProperty(id)) {
            playerArray[id].move();
        }
    }
}




function drawSquare(colour, player) {


    var square = playField[player.getColumn()][player.getRow()];

if(square.getPlayer() === null){
  squareCounter --;

  if(squareCounter === 0){
    clearGameState();
  }
}

    square.setPlayer(player);

    square.drawSquare(colour);
}

function clearGameState(){
  for(var id in playerArray) {
      if (playerArray.hasOwnProperty(id)) {
          playerArray[id].setDirection(-1);

          playerArray[id].setRow(Math.floor((Math.random() * (screenHeight/squareSize))));
          playerArray[id].setColumn(Math.floor((Math.random() * (screenWidth/squareSize))));

      }
  }


  this.playField = [];
  this.initialized = false;
}

// Draw highscore in blocks
function drawHighScore(){
var highScoreField = [];
  for(var i = 0;i<screenWidth/squareSize;i++){
    var objects = [];
    for(var j = 0;j<screenHeight/squareSize;j++){
       objects.push(new Square(i * squareSize, j * squareSize, null));
    }
    highScoreField.push(objects);
  }
  console.log(highScoreField);

  // calculate middle
  var totalWidth = screenWidth/squareSize;
  var leftOverWidth = totalWidth - 34;
  var leftLeftOver = leftOverWidth /2;

  var totalHeight = screenHeight/squareSize;
  var leftOverHeight = totalHeight - 23;
  var leftUpperHeight = leftOverHeight /2;

  // calculate number positions


  numberPosArray[0] ={x:leftLeftOver+7,y:leftUpperHeight+6};
  numberPosArray[1] ={x:leftLeftOver+11,y:leftUpperHeight+6};
  numberPosArray[2] ={x:leftLeftOver+15,y:leftUpperHeight+6};
  numberPosArray[3] ={x:leftLeftOver+19,y:leftUpperHeight+6};

  numberPosArray[4] ={x:leftLeftOver+7,y:leftUpperHeight+12};
  numberPosArray[5] ={x:leftLeftOver+11,y:leftUpperHeight+12};
  numberPosArray[6] ={x:leftLeftOver+15,y:leftUpperHeight+12};
  numberPosArray[7] ={x:leftLeftOver+19,y:leftUpperHeight+12};

  numberPosArray[8] ={x:leftLeftOver+7,y:leftUpperHeight+18};
  numberPosArray[9] ={x:leftLeftOver+11,y:leftUpperHeight+18};
  numberPosArray[10] ={x:leftLeftOver+15,y:leftUpperHeight+18};
  numberPosArray[11] ={x:leftLeftOver+19,y:leftUpperHeight+18};



  // drawHighscoreText(highScoreField, blue,leftLeftOver,leftUpperHeight);
  //
  // drawScore(1,"1337",blue);
  // drawScore(2,"666",red);
  // drawScore(3,"404",green);
}




function drawHighscoreText(highScoreField, color, x, y){

  // H
  highScoreField[x+0][y+0].drawSquare(color);
  highScoreField[x+0][y+1].drawSquare(color);
  highScoreField[x+0][y+2].drawSquare(color);
  highScoreField[x+0][y+3].drawSquare(color);
  highScoreField[x+0][y+4].drawSquare(color);

  highScoreField[x+1][y+2].drawSquare(color);

  highScoreField[x+2][y+0].drawSquare(color);
  highScoreField[x+2][y+1].drawSquare(color);
  highScoreField[x+2][y+2].drawSquare(color);
  highScoreField[x+2][y+3].drawSquare(color);
  highScoreField[x+2][y+4].drawSquare(color);

  // I
  highScoreField[x+4][y+0].drawSquare(color);

  highScoreField[x+4][y+2].drawSquare(color);
  highScoreField[x+4][y+3].drawSquare(color);
  highScoreField[x+4][y+4].drawSquare(color);

  // G
  highScoreField[x+6][y+1].drawSquare(color);
  highScoreField[x+6][y+2].drawSquare(color);
  highScoreField[x+6][y+3].drawSquare(color);

  highScoreField[x+7][y+0].drawSquare(color);
  highScoreField[x+7][y+4].drawSquare(color);
  highScoreField[x+8][y+0].drawSquare(color);
  highScoreField[x+8][y+2].drawSquare(color);
  highScoreField[x+8][y+4].drawSquare(color);
  highScoreField[x+9][y+2].drawSquare(color);
  highScoreField[x+9][y+3].drawSquare(color);

  // H
  highScoreField[x+11][y+0].drawSquare(color);
  highScoreField[x+11][y+1].drawSquare(color);
  highScoreField[x+11][y+2].drawSquare(color);
  highScoreField[x+11][y+3].drawSquare(color);
  highScoreField[x+11][y+4].drawSquare(color);

  highScoreField[x+12][y+2].drawSquare(color);

  highScoreField[x+13][y+0].drawSquare(color);
  highScoreField[x+13][y+1].drawSquare(color);
  highScoreField[x+13][y+2].drawSquare(color);
  highScoreField[x+13][y+3].drawSquare(color);
  highScoreField[x+13][y+4].drawSquare(color);

  // S
  highScoreField[x+15][y+0].drawSquare(color);
  highScoreField[x+15][y+1].drawSquare(color);
  highScoreField[x+15][y+2].drawSquare(color);
  highScoreField[x+15][y+4].drawSquare(color);

  highScoreField[x+16][y+0].drawSquare(color);
  highScoreField[x+16][y+2].drawSquare(color);
  highScoreField[x+16][y+4].drawSquare(color);

  highScoreField[x+17][y+0].drawSquare(color);
  highScoreField[x+17][y+2].drawSquare(color);
  highScoreField[x+17][y+3].drawSquare(color);
  highScoreField[x+17][y+4].drawSquare(color);

  // C
  highScoreField[x+19][y+0].drawSquare(color);
  highScoreField[x+19][y+1].drawSquare(color);
  highScoreField[x+19][y+2].drawSquare(color);
  highScoreField[x+19][y+3].drawSquare(color);
  highScoreField[x+19][y+4].drawSquare(color);

  highScoreField[x+20][y+0].drawSquare(color);
  highScoreField[x+20][y+4].drawSquare(color);
  highScoreField[x+21][y+0].drawSquare(color);
  highScoreField[x+21][y+4].drawSquare(color);

  // O
  highScoreField[x+23][y+0].drawSquare(color);
  highScoreField[x+23][y+1].drawSquare(color);
  highScoreField[x+23][y+2].drawSquare(color);
  highScoreField[x+23][y+3].drawSquare(color);
  highScoreField[x+23][y+4].drawSquare(color);

  highScoreField[x+24][y+0].drawSquare(color);
  highScoreField[x+24][y+4].drawSquare(color);

  highScoreField[x+25][y+0].drawSquare(color);
  highScoreField[x+25][y+1].drawSquare(color);
  highScoreField[x+25][y+2].drawSquare(color);
  highScoreField[x+25][y+3].drawSquare(color);
  highScoreField[x+25][y+4].drawSquare(color);

  // R
  highScoreField[x+27][y+0].drawSquare(color);
  highScoreField[x+27][y+1].drawSquare(color);
  highScoreField[x+27][y+2].drawSquare(color);
  highScoreField[x+27][y+3].drawSquare(color);
  highScoreField[x+27][y+4].drawSquare(color);

  highScoreField[x+28][y+0].drawSquare(color);
  highScoreField[x+28][y+2].drawSquare(color);

  highScoreField[x+29][y+0].drawSquare(color);
  highScoreField[x+29][y+1].drawSquare(color);
  highScoreField[x+29][y+3].drawSquare(color);
  highScoreField[x+29][y+4].drawSquare(color);

  // E
  highScoreField[x+31][y+0].drawSquare(color);
  highScoreField[x+31][y+1].drawSquare(color);
  highScoreField[x+31][y+2].drawSquare(color);
  highScoreField[x+31][y+3].drawSquare(color);
  highScoreField[x+31][y+4].drawSquare(color);

  highScoreField[x+32][y+0].drawSquare(color);
  highScoreField[x+32][y+2].drawSquare(color);
  highScoreField[x+32][y+4].drawSquare(color);

  highScoreField[x+33][y+0].drawSquare(color);
  highScoreField[x+33][y+4].drawSquare(color);




}

// Draw function that gets called in the update loop
function draw() {
    init();

    movePlayers();
}

// Game background
canvas.style.backgroundColor = "white";

// Loop interval, game speed
setInterval(draw, 100);
