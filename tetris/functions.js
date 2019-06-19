const getNewFigure = (type, rotation) => {
    let newFigure = {};

    newFigure.squaresCollection = getSquaresCollection(getTemplateFigureOfTypeAndRotation(type, rotation));
    newFigure.type = type;
    newFigure.rotation = rotation;
    
    return newFigure;
}, 
getSquaresCollection = (grid) => {
    let squares = [];
    
    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid[0].length; col++){
            if(grid[row][col] === 1){            
                squares.push(new Square(col, row));
            }
        }
    }

    return squares;
},
getTemplateFigureOfTypeAndRotation = (type, rotation) => {       
    switch(type){
        case "o":
            return [                
                [0, 1, 1],
                [0, 1, 1]                
            ];
        case "i":
            switch (rotation) {
                case 0:
                    return [
                        [0, 1],
                        [0, 1],
                        [0, 1],
                        [0, 1]
                    ];                    
                case 1:
                    return [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1]                        
                    ];
                case 2:                
                    return [
                        [0, 0, 1],
                        [0, 0, 1],
                        [0, 0, 1],
                        [0, 0, 1]
                    ];
                case 3:
                    return [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [1, 1, 1, 1]
                    ];
            }
        case "s":
            switch(rotation){
                case 0: 
                    return [
                        [1, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 0, 0]
                    ];
                case 1:
                    return [
                        [0, 1, 1, 0],
                        [1, 1, 0, 0]
                    ];
                case 2: 
                    return [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0]
                    ];
                case 3:
                    return [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [1, 1, 0, 0]
                    ];
            }
        case "z":
            switch(rotation){
                case 0: 
                    return [
                        [0, 1],
                        [1, 1],
                        [1, 0]
                    ];
                case 1:
                    return [
                        [1, 1, 0],
                        [0, 1, 1]
                    ];
                case 2: 
                    return [
                        [0, 0, 1],
                        [0, 1, 1],
                        [0, 1, 0]
                    ];
                case 3:
                    return [
                        [0, 0, 0],
                        [1, 1, 0],
                        [0, 1, 1]
                    ];
            }
        case "l":
            switch(rotation){
                case 0: 
                    return [
                        [1, 1],
                        [0, 1],
                        [0, 1]
                    ];
                case 1:
                    return [
                        [0, 0, 1],
                        [1, 1, 1]                        
                    ];
                case 2: 
                    return [
                        [0, 1, 0],
                        [0, 1, 0],
                        [0, 1, 1]
                    ];
                case 3:
                    return [
                        [0, 0, 0],
                        [1, 1, 1],
                        [1, 0, 0]
                    ];
            }        
        case "j":
            switch(rotation){
                case 0: 
                    return [
                        [0, 1, 1],
                        [0, 1, 0],
                        [0, 1, 0]
                    ];
                case 1:
                    return [
                        [0, 0, 0],
                        [1, 1, 1],
                        [0, 0, 1]
                    ];
                case 2: 
                    return [
                        [0, 1],
                        [0, 1],
                        [1, 1]
                    ];
                case 3:
                    return [
                        [1, 0, 0],
                        [1, 1, 1]
                    ];
            }  
        case "t":
            switch(rotation){
                case 0: 
                    return [
                        [0, 1, 0],
                        [1, 1, 1]
                    ];   
                case 1:
                    return [
                        [0, 1, 0],
                        [0, 1, 1],
                        [0, 1, 0]
                    ];
                case 2: 
                    return [
                        [0, 0, 0],
                        [1, 1, 1],
                        [0, 1, 0]
                    ]
                case 3:
                    return [
                        [0, 1],
                        [1, 1],
                        [0, 1]
                    ];
            }
    }
},
generateRandomType = () => {
    let type = "oiszljt"[(Math.random() * 7) | 0];

    while(nextFigure.type === type){
        type = "oiszljt"[(Math.random() * 7) | 0];
    }

    return type;
},
InitStartingFigures = () => {
    let ntype = generateRandomType(), mtype = generateRandomType();

    nextFigure = getNewFigure(ntype, defaultHoldAndNextRotations[ntype])
    movingFigure = getNewFigure(mtype, defaultSpawnRotations[mtype]);

    moveFigure(movingFigure, 0, squaresToMoveCurrentFigureToCenterIt);
    moveFigure(nextFigure, ...squaresToMoveHoldAndNextFigureToCenterThem[nextFigure.type]);

    squaresToMoveAfterRotation.right += squaresToMoveCurrentFigureToCenterIt;

    drawFigure(nextFigure, nctx);
    drawFigure(movingFigure, ctx);

    movingFigure.squaresCollection.sort((a, b) => a.xs - b.xs);
},
stayInCanvas = () => {  
    let squaresToMove;

    if(movingFigure.squaresCollection[0].xs < 0)
        squaresToMove = Math.abs(movingFigure.squaresCollection[0].xs);    
    else if(movingFigure.squaresCollection.slice(-1)[0].xs >= gameCanvasGridSizes.cols)
        squaresToMove = -(movingFigure.squaresCollection.slice(-1)[0].xs - gameCanvasGridSizes.cols + 1);
    
    if(squaresToMove){
        squaresToMoveAfterRotation.right += squaresToMove;
        moveFigure(movingFigure, 0, squaresToMove);
    }
},
dontCameIntoAnotherFigures = () => {
    let squaresToCheckCollision = {
            fromLeftSide : movingFigure.squaresCollection
                .filter(square => square.xs === movingFigure.squaresCollection[0].xs),
            fromRightSide : movingFigure.squaresCollection
                .filter(square => square.xs === movingFigure.squaresCollection.slice(-1)[0].xs),
        },
        staticSquaresWithSameX = {
            forLeftSide : staticFiguresOnScreen
                .map(figure => figure.squaresCollection)
                .reduce((acc, curr) => acc
                    .concat(curr
                        .filter(square => square.xs === squaresToCheckCollision.fromLeftSide[0].xs)), []),
            forRightSide : staticFiguresOnScreen
                .map(figure => figure.squaresCollection)
                .reduce((acc, curr) => acc
                    .concat(curr
                        .filter(square => square.xs === squaresToCheckCollision.fromRightSide[0].xs)), []),   
        }
    
    if(squaresToCheckCollision.fromLeftSide.some(square => staticSquaresWithSameX.forLeftSide.find(s => s.ys === square.ys))){
        squaresToMoveAfterRotation.right++;
        moveFigure(movingFigure, 0, 1);
    }
    else if(squaresToCheckCollision.fromLeftSide.some(square => staticSquaresWithSameX.forRightSide.find(s => s.ys === square.ys))){
        squaresToMoveAfterRotation.right--;
        moveFigure(movingFigure, 0, -1);
    }

},
collideDown = () => {    
   
},
removeRowIfTetrisHappen = () => {
    for(let row = 0; row < gameCanvasGridSizes.rows; row++){        
        let allSquares = staticFiguresOnScreen
                .map(figure => figure.squaresCollection)
                .reduce((acc, curr) => acc.concat(curr), []),
            squaresOnThatRow = allSquares
                .filter(square => square.ys === row);
        
        if(squaresOnThatRow.length === gameCanvasGridSizes.cols){                                    
            staticFiguresOnScreen = staticFiguresOnScreen.map(figure => {
                return {
                    type : figure.type, 
                    squaresCollection : figure.squaresCollection.filter(square => square.ys !== row),
                    rotation : figure.rotation
                };
            });

            allSquares.filter(square => square.ys < row).forEach(square => square.ys++);
        }        
    }
},
rotate = (direction) => {    
    if(movingFigure.type === "o")
        return;

    let nextRotation = 0;
    if(direction === "right"){
        if(movingFigure.rotation !== 3)
            nextRotation = movingFigure.rotation + 1;                
    }
    else {
        if(movingFigure.rotation === 0)
            nextRotation = 3;        
        else 
            nextRotation = movingFigure.rotation - 1;        
    }

    movingFigure = getNewFigure(movingFigure.type, nextRotation);                
    moveFigure(movingFigure, squaresToMoveAfterRotation.down, squaresToMoveAfterRotation.right);

    movingFigure.squaresCollection.sort((a, b) => a.xs - b.xs);
},
hold = () => {
    if(!isHoldAvailable)
        return;

    hctx.clearRect(0, 0, holdCanvas.width, holdCanvas.height);
    let type = holdFigure.type;
    
    holdFigure = getNewFigure(movingFigure.type, defaultHoldAndNextRotations[movingFigure.type]);                        

    if(type)
        movingFigure = getNewFigure(type, defaultSpawnRotations[type]);            
    else 
        makeNextFigureCome();            
    
    moveFigure(holdFigure, ...squaresToMoveHoldAndNextFigureToCenterThem[holdFigure.type]);
    moveFigure(movingFigure, 0, squaresToMoveCurrentFigureToCenterIt);
    
    drawFigure(holdFigure, hctx);

    squaresToMoveAfterRotation = { down : 0, right : squaresToMoveCurrentFigureToCenterIt };
    movingFigure.squaresCollection.sort((a, b) => a.xs - b.xs);

    isHoldAvailable = false;
},
spaceClick = () => {    
    staticFiguresOnScreen.push(movingFigure);

    makeNextFigureCome();

    moveFigure(movingFigure, 0, squaresToMoveCurrentFigureToCenterIt);
    drawFigure(movingFigure, ctx)

    squaresToMoveAfterRotation = { down : 0, right : squaresToMoveCurrentFigureToCenterIt };
    movingFigure.squaresCollection.sort((a, b) => a.xs - b.xs);        
},
makeNextFigureCome = () => {
    nctx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

    let newType = generateRandomType();
    movingFigure = getNewFigure(nextFigure.type, defaultSpawnRotations[nextFigure.type]);
    nextFigure = getNewFigure(newType, defaultHoldAndNextRotations[newType]);

    moveFigure(nextFigure, ...squaresToMoveHoldAndNextFigureToCenterThem[newType]);
    drawFigure(nextFigure, nctx);

    isHoldAvailable = true;
},
moveFigure = (figure, r, c) => {
    figure.squaresCollection.forEach(square => {
        square.xs += c;
        square.ys += r;
    });
},
drawCanvasSquaresBorders = () => {
    ctx.strokeStyle = colors.squaresBordersColor;

    for(let row = 0; row < gameCanvasGridSizes.rows; row++){
        for(let col = 0; col < gameCanvasGridSizes.cols; col++){
            ctx.strokeRect(col * gameCanvasSquaresSides.width, row * gameCanvasSquaresSides.height, gameCanvasSquaresSides.width, gameCanvasSquaresSides.height);
        }
    }
},
drawFigure = (figure, context, isPredictedFigure) => {
    context.fillStyle = colors[figure.type];
    figure.squaresCollection.forEach(square => square.draw(context, isPredictedFigure));
},
drawPredictedFigure = () => {
    let currentFigureMostDownSquare = [...movingFigure.squaresCollection].sort((a, b) => b.ys - a.ys)[0]
        minDiff = gameCanvasGridSizes.rows,
        predictedFigure = getNewFigure(movingFigure.type, movingFigure.rotation), 
        sameXsSquares = staticFiguresOnScreen
        .map(figure =>             
            figure.squaresCollection
            .filter(square =>                                   
                    square.xs >= movingFigure.squaresCollection[0].xs &&
                    square.xs <= movingFigure.squaresCollection.slice(-1)[0].xs &&
                    square.ys >= currentFigureMostDownSquare.ys)
            ).reduce((acc, curr) => acc.concat(curr), []);

    if(sameXsSquares.length){
        movingFigure.squaresCollection.forEach(square => {
            let mostUpperSquare = sameXsSquares.filter(s => s.xs === square.xs).sort((a, b) => a.ys - b.ys)[0],
                currDiff = mostUpperSquare ? mostUpperSquare.ys - square.ys - 1 : gameCanvasGridSizes.rows;
    
            if(minDiff > currDiff)          
                minDiff = currDiff;        
        });
    } 
    else 
        minDiff = gameCanvasGridSizes.rows - squaresToMoveAfterRotation.down - getTemplateFigureOfTypeAndRotation(movingFigure.type, movingFigure.rotation).length;
    
    moveFigure(predictedFigure, minDiff + squaresToMoveAfterRotation.down, squaresToMoveAfterRotation.right);
    drawFigure(predictedFigure, ctx, true);
    
    squaresToMoveForHardDrop = minDiff;
},
drawStaticFiguresOnScreen = () => staticFiguresOnScreen.forEach(figure => drawFigure(figure, ctx));
drawGameCanvas = () => {
    drawCanvasSquaresBorders();
    drawStaticFiguresOnScreen();
    drawFigure(movingFigure, ctx);
    drawPredictedFigure();
},

showInstructions = () => alert("Hi, User. You can move your figures with the arrow keys. To rotate your figures, press the up arrow key. Also the figure on your left is your holding figure. If you dont like your current piece you can exchange it with that holding figure. On your right is your next figure. Got it?");