class Square {
    constructor(xs, ys){
        this.xs = xs;
        this.ys = ys;
    }

    draw(context, shouldStrokeOnly){
        let width, height;

        if(context !== ctx)
            [width, height] = [holdAndNextCanvasSquaresSides.width, holdAndNextCanvasSquaresSides.height];            
        else 
            [width, height] = [gameCanvasSquaresSides.width, gameCanvasSquaresSides.height];

        if(shouldStrokeOnly){
            context.lineWidth = strokeWidths.predictedFigure;
            context.strokeStyle = colors[movingFigure.type];
        }
        else {
            context.strokeStyle = context === ctx ? colors.movingFiguresStroke : colors.holdAndNextFiguresStroke;
            context.fillRect(width * this.xs, height * this.ys, width, height);
        }
        
        context.strokeRect(width * this.xs, height * this.ys, width, height);
        context.lineWidth = strokeWidths.default;
    }
}