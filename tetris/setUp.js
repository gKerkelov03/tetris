const gameCanvas = document.getElementById("gameCanvas"),
    holdCanvas = document.getElementById("holdCanvas"),
    nextCanvas = document.getElementById("nextCanvas"),
    ctx = gameCanvas.getContext("2d"),
    hctx = holdCanvas.getContext("2d"),
    nctx = nextCanvas.getContext("2d");

gameCanvas.width = (window.innerHeight - 5) / 2;
gameCanvas.height = window.innerHeight - 5;

const colors = {
        o : "rgb(255, 255, 100)",
        i : "aqua",
        s : "#ADFF2F",
        z : "rgb(255, 51, 16)",
        l : "orange",
        j : "rgb(31, 31, 183)",
        t : "rgb(153, 0, 153)",
        squaresBordersColor : "gray",
        movingFiguresStroke : "gray",
        holdAndNextFiguresStroke : "black"
    },
    defaultHoldAndNextRotations = {                
        i : 0,
        s : 1,
        z : 1,
        l : 2,
        j : 2,
        t : 0 
    },
    defaultSpawnRotations = {
        i : 1,
        s : 1,
        z : 1,
        l : 1,
        j : 1,
        t : 0 
    },
    squaresToMoveHoldAndNextFigureToCenterThem = {
        o : [1, 0],
        i : [0, 0.5],
        s : [1, 0.5],
        z : [1, 0.5],
        l : [0.5, 0],
        j : [0.5, 1],
        t : [1, 0.5]  
    },
    squaresToMoveCurrentFigureToCenterIt = 3,
    gameCanvasGridSizes = {
        rows : 20,
        cols : 10
    },
    holdAndNextCanvasGridSizes = {
        rows : 4,
        cols : 4
    },
    gameCanvasSquaresSides = {        
        width : gameCanvas.width / gameCanvasGridSizes.cols,
        height : gameCanvas.height / gameCanvasGridSizes.rows
    },
    ratioOfHoldAndNextSquares = 1.7,
    holdAndNextCanvasSquaresSides = {
        width : gameCanvasSquaresSides.width * ratioOfHoldAndNextSquares,
        height : gameCanvasSquaresSides.height   * ratioOfHoldAndNextSquares
    },
    strokeWidths = {
        default : 1,
        predictedFigure : 3
    },   
    secondsToMovePieces = 1; 
    
let holdFigure = {},
    movingFigure = {},
    nextFigure = {},
    staticFiguresOnScreen = [],
    isHoldAvailable = true,  
    squaresToMoveForHardDrop = 0,
    score = 0,  
    squaresToMoveAfterRotation = {
        down : 0,
        right : 0
    };

holdCanvas.width = nextCanvas.width = holdAndNextCanvasGridSizes.cols * holdAndNextCanvasSquaresSides.width;
holdCanvas.height = nextCanvas.height = holdAndNextCanvasGridSizes.rows * holdAndNextCanvasSquaresSides.height;

nextCanvas.style.left = window.innerWidth - holdCanvas.width - gameCanvas.width - nextCanvas.width - 15 + "px";
nextCanvas.style.bottom = holdCanvas.style.bottom = window.innerHeight - holdCanvas.height - 5 + "px"; 

gameCanvas.style.left = (window.innerWidth - holdCanvas.width * 2) / 2 - gameCanvas.width / 2 + "px";