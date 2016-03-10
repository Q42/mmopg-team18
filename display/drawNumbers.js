/**
 * Created by vi3txluuk on 9-3-2016.
 */
function drawOne(x, y, color){
    playField[x][y+1].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+1][y+1].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x+1][y+3].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
}

function drawTwo(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x+2][y+1].drawSquare(color);
    playField[x+2][y+2].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x][y+2].drawSquare(color);
    playField[x][y+3].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
}

function drawThree(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
    playField[x+2][y+1].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x+2][y+3].drawSquare(color);
}

function drawFour(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x][y+1].drawSquare(color);
    playField[x+2][y+1].drawSquare(color);
    playField[x][y+2].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x+2][y+2].drawSquare(color);
    playField[x+2][y+3].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
}

function drawFive(x, y , color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
    playField[x][y+1].drawSquare(color);
    playField[x][y+2].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x+2][y+2].drawSquare(color);
    playField[x+2][y+3].drawSquare(color);
}

function drawSix(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
    playField[x][y+1].drawSquare(color);
    playField[x][y+2].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x+2][y+2].drawSquare(color);
    playField[x][y+3].drawSquare(color);
    playField[x+2][y+3].drawSquare(color);
}

function drawSeven(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x+2][y+1].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x][y+3].drawSquare(color);
    playField[x][y+4].drawSquare(color);
}

function drawEight(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
    playField[x][y+1].drawSquare(color);
    playField[x+2][y+1].drawSquare(color);
    playField[x][y+2].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x+2][y+2].drawSquare(color);
    playField[x][y+3].drawSquare(color);
    playField[x+2][y+3].drawSquare(color);

}

function drawNine(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
    playField[x][y+1].drawSquare(color);
    playField[x+2][y+1].drawSquare(color);
    playField[x][y+2].drawSquare(color);
    playField[x+1][y+2].drawSquare(color);
    playField[x+2][y+2].drawSquare(color);
    playField[x+2][y+3].drawSquare(color);
}

function drawZero(x, y, color){
    playField[x][y].drawSquare(color);
    playField[x+1][y].drawSquare(color);
    playField[x+2][y].drawSquare(color);
    playField[x][y+4].drawSquare(color);
    playField[x+1][y+4].drawSquare(color);
    playField[x+2][y+4].drawSquare(color);
    playField[x][y+1].drawSquare(color);
    playField[x+2][y+1].drawSquare(color);
    playField[x][y+2].drawSquare(color);
    playField[x+2][y+2].drawSquare(color);
    playField[x][y+3].drawSquare(color);
    playField[x+2][y+3].drawSquare(color);}