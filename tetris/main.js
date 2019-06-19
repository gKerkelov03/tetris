// showInstructions();
drawCanvasSquaresBorders();
InitStartingFigures();
drawPredictedFigure();

setInterval(() => {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    moveFigure(movingFigure, 1, 0);
    squaresToMoveAfterRotation.down++;

    collideDown();
    removeRowIfTetrisHappen();
    drawGameCanvas();    
}, secondsToMovePieces * 1000); 

document.addEventListener("keydown", (event) => {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    switch(event.keyCode){
        case 38: rotate("right"); break;
        case 67: hold(); break;
        case 90: rotate("left"); break;
        case 32: 
            moveFigure(movingFigure, squaresToMoveForHardDrop, 0);
            spaceClick();        
            break;
        case 37:            
            moveFigure(movingFigure, 0, -1);
            squaresToMoveAfterRotation.right--;
            break;
        case 39:            
            moveFigure(movingFigure, 0, 1);
            squaresToMoveAfterRotation.right++;
            break;
        case 40:
            moveFigure(movingFigure, 1, 0);
            squaresToMoveAfterRotation.down++;
            break;
    }
    console.log("abe")
    stayInCanvas();
    dontCameIntoAnotherFigures();
    removeRowIfTetrisHappen();
    drawGameCanvas();
});