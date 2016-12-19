/*  Credit to Jake Gordon's Tetris tutorial 
    http://www.codeincomplete.com/games/
    
    Credit to Paul Irish's example on requestAnimationFrame
    https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    
    Credit to www.javascriptkit.com's example on requestAnimationFrame
    http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
*/
function startGame() {
    //listenToEvents();
    document.addEventListener('keydown', keypress, false);
    window.addEventListener('resize', resize, false);
    var currentTime  = getCurrentTime();
    var lastTime=getCurrentTime();

    function frame() {
        currentTime = getCurrentTime();
        update(Math.min(1, (currentTime - lastTime) / 1000.0));
        draw();
        lastTime = currentTime;
        requestAnimationFrame(frame, gameCanvas);
    }
    resize();
    reset();
    frame();
};


function keypress(event) {
    var handled = false;
    if (playing) {
        if(event.keyCode==KEY.LEFT){
            actionsQueue.push(DIR.LEFT);
            handled = true;
        }else if(event.keyCode==KEY.RIGHT){
            actionsQueue.push(DIR.RIGHT);
            handled = true;
        }else if(event.keyCode==KEY.UP){
            actionsQueue.push(DIR.UP);
            handled = true;
        }else if(event.keyCode==KEY.DOWN){
            actionsQueue.push(DIR.DOWN);
            handled = true;
        }else if(event.keyCode==KEY.ESC) {
            socket.emit("endOfGame", room);
            handled = true;
        }
    }
    if (handled) {
        event.preventDefault();
    }
};

function resize() {
    gameCanvas.width = gameCanvas.clientWidth;
    gameCanvas.height = gameCanvas.clientHeight;
    upcomingBlockCanvas.width = upcomingBlockCanvas.clientWidth;
    upcomingBlockCanvas.height = upcomingBlockCanvas.clientHeight;
    blockWidth = gameCanvas.width / courtWidth;
    blockHeight = gameCanvas.height / courtHeight;
    invalidateCourt();
    invalid.next = true;
};


function play() {
    reset();
    playing = true;
};

function end() {
    show('start');
    setdisplayedScore();
    playing = false;
    //var finalscore=document.getElementById('score').innerHTML;
    updateScore(currentscore);
}

function reset() {
    timePassed = 0;
    actionsQueue = [];
    blocks = [];
    invalidateCourt();
    setScore(0);
    setValueOfRows(0);
    selectCurrentPiece(next);
    selectNextPiece();
};

//*
function draw() {
    //for game 1
    drawTetrisCourt();
    drawNextBlock();
    emitScore();
    drawHtmlForRows();
    gameCanvasContext.restore();
}

function drawTetrisCourt() {
    if (invalid.court) {
        gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        if (playing) {

            drawPiece(gameCanvasContext, current.type, current.x, current.y, current.dir);
        }
        var y=0, block;
        while(y<courtHeight){
            var x=0;
            while(x<courtWidth) {
                block = returnBlock(x, y);
                if (block != null)
                    drawBlock(gameCanvasContext, x, y, block.color);
                x++;
            }
            y++;
        }
        gameCanvasContext.strokeRect(0, 0, courtWidth * blockWidth - 1, courtHeight * blockHeight - 1); // court boundary
        invalid.court = false;
    }
};

function drawNextBlock() {
    if (invalid.next) {
        var padding = (upcomingCourtSize - next.type.size) / 2;
        upcomingCanvasContext.save();
        upcomingCanvasContext.translate(0.5, 0.5);
        upcomingCanvasContext.clearRect(0, 0, upcomingCourtSize * blockWidth, upcomingCourtSize * blockHeight);
        drawPiece(upcomingCanvasContext, next.type, padding, padding, next.dir);
        upcomingCanvasContext.strokeStyle = 'black';
        upcomingCanvasContext.strokeRect(0, 0, upcomingCourtSize * blockWidth - 1, upcomingCourtSize * blockHeight - 1);
        upcomingCanvasContext.restore();
        invalid.next = false;
    }
};

function drawPiece(context, type, xPosition, yPosition, dir) {
    iterateBlock(type, xPosition, yPosition, dir, function (xPosition, yPosition) {
        drawBlock(context, xPosition, yPosition, type.color);
    });
};

function drawBlock(context, xPosition, yPosition, color) {
    context.fillStyle = color;
    context.fillRect(xPosition * blockWidth, yPosition * blockHeight, blockWidth, blockHeight);
    context.strokeRect(xPosition * blockWidth, yPosition * blockHeight, blockWidth, blockHeight);
};

function drawHtmlForRows() {
    if (invalid.rows) {
        drawHtml('rows', rows);
        invalid.rows = false;
    }
};
function emitScore() {
    if (invalid.currentscore) {
        //drawHtml('score', ("00000" + Math.floor(displayedscore)).slice(-5));
        //var slice = Math.floor(displayedscore).slice(-5);
        score = ("00000" + Math.floor(displayedscore)).slice(-5);

        socket.emit('updatePlayerScore', {room: room, score: score, socket: socket.id});
        invalid.currentscore = false;
    }
};

function update(time) {
    if (playing) {
        if (displayedscore < currentscore)
            setdisplayedScore(displayedscore + 1);
        handle(actionsQueue.shift());
        timePassed = timePassed + time;
        if (timePassed > step) {
            timePassed = timePassed - step;
            drop();
        }
    }
};

document.onkeydown = function (e) {
    var code = 0;
    switch (e.keyCode) {
        case 37:
            code = 37;
            break;
        case 38:
            code = 38;
            break;
        case 39:
            code = 39;
            break;
        case 40:
            code = 40;
            break;
    }
    socket.emit("nextKey", code);
};

socket.on('nextKey', function (code) {
    var x = current.x, y = current.y;
    switch (code) {
        case 37:
            DIR.LEFT = x -= 1;
            break;
        case 38:
            var newdirection = (current.dir === DIR.MAX ? DIR.MIN : current.dir + 1);
            if (!isOccupied(current.type, current.x, current.y, newdirection)) {
                DIR.UP = current.dir = newdirection;
                invalidateCourt();
            }
            break;
        case 39:
            DIR.RIGHT = x += 1;
            break;
        case 40:
            DIR.DOWN =  y += 1;
            break;
    }
    if(code != 38) {
        if (!isOccupied(current.type, x, y, current.dir)) {
            current.x = x;
            current.y = y;
            invalidateCourt();
            return true;
        }
        else {
            return false;
        }
    }
});

function handle(action) {
    var x = current.x, y = current.y;
    if(action==DIR.LEFT){
        x -= 1;
    } else if(action==DIR.RIGHT){
        x += 1;
    } else if(action==DIR.UP){
        rotate();
    } else if(action==DIR.DOWN){
        drop();
    }
};

function move(direction) {
    var x = current.x, y = current.y;
    if(direction==DIR.DOWN){
        y += 1;
        if (!isOccupied(current.type, x, y, current.dir)) {
            current.x = x;
            current.y = y;
            invalidateCourt();
            return true;
        }
        else {
            return false;
        }
    }
};

function rotate() {
    //change the direction clockwise
    var newdirection = (current.dir == DIR.MAX ? DIR.MIN : current.dir + 1);
    if (!isOccupied(current.type, current.x, current.y, newdirection)) {
        current.dir = newdirection;
        invalidateCourt();
    }
};

//*
function drop() {
    if (!move(DIR.DOWN)) {
        addScore(10);

        iterateBlock(current.type, current.x, current.y, current.dir, function (xPosition, yPosition) {
            addBlockToCourt(xPosition, yPosition, current.type);
        });

        removeLines();
        selectCurrentPiece(next);
        selectNextPiece();
        actionsQueue = [];
        if (isOccupied(current.type, current.x, current.y, current.dir)) {
            socket.emit("endOfGame", room);
        }
    }
};

function removeLines() {
    var xPosition, yPosition, done, numRows = 0;
    for (yPosition = courtHeight; yPosition > 0; --yPosition) {
        done = true;
        for (xPosition = 0; xPosition < courtWidth; ++xPosition) {
            if (!returnBlock(xPosition, yPosition))
                done = false;
        }
        if (done) {
            removeLine(yPosition);
            yPosition = yPosition + 1;
            numRows++;
        }
    }
    if (numRows > 0) {
        setValueOfRows(rows + numRows);
        addScore(100 * Math.pow(2, numRows - 1));
    }
}

function removeLine(position) {
    var xPosition, yPosition;
    for (yPosition = position; yPosition >= 0; --yPosition) {
        for (xPosition = 0; xPosition < courtWidth; ++xPosition)
            addBlockToCourt(xPosition, yPosition, (yPosition == 0) ? null : returnBlock(xPosition, yPosition - 1));
    }
}

//iterate through the block
function iterateBlock(type, xPosition, yPosition, dir, fn) {
    var hex, row = 0, col = 0, blocks = type.blocks[dir];
    for (hex = 0x8000; hex > 0; hex = hex >> 1) {
        if (blocks & hex) {
            fn(xPosition + col, yPosition + row);
        }
        if (++col === 4) {
            col = 0;
            ++row;
        }
    }
}

//check if block can be shifted to a position
function isOccupied(type, xPosition, yPosition, dir) {
    var result = false;
    iterateBlock(type, xPosition, yPosition, dir, function (xPosition, yPosition) {
        if ((xPosition < 0) || (xPosition >= courtWidth) || (yPosition < 0) || (yPosition >= courtHeight) || returnBlock(xPosition, yPosition))
            result = true;
    });
    return result;
};


function show(id) {
    document.getElementById(id).style.visibility = null;
};

function setScore(n) {
    currentscore = n;
    setdisplayedScore(n);
};
function addScore(n) {
    currentscore += n;
};

function setdisplayedScore(n) {
    displayedscore = n || currentscore;
    invalid.currentscore = true;
};

function selectCurrentPiece(piece) {
    current = piece || selectRandomPiece();

    invalidateCourt();
};
function selectRandomPiece() {

    var tetrisPieces = [iBlock, jBlock, lBlock, oBlock, sBlock,
        tBlock, zBlock, iBlock, jBlock, lBlock,
        oBlock, sBlock, tBlock, zBlock, iBlock,
        jBlock, lBlock, oBlock, sBlock, tBlock,
        zBlock, iBlock, jBlock, lBlock, oBlock,
        sBlock, tBlock, zBlock];

    var type = tetrisPieces[index];
    index++;
    if (index >= 28) {
        index = 0;
    }

    return {type: type, dir: DIR.UP, x: courtWidth - type.size, y: 0};
};

function returnBlock(xPosition, yPosition) {
    return (blocks && blocks[xPosition] ? blocks[xPosition][yPosition] : null);
};


function getCurrentTime() {
    return new Date().getTime();
}

function addBlockToCourt(xPosition, yPosition, type) {
    blocks[xPosition] = blocks[xPosition] || [];
    blocks[xPosition][yPosition] = type;
    invalidateCourt();
};

function selectNextPiece(piece) {

    next = piece || selectRandomPiece();

    invalid.next = true;
}
function drawHtml(id, html) {
    document.getElementById(id).innerHTML = html;
}
function setValueOfRows(n) {
    rows = n;
    //update the speed of blocks
    step = Math.max(speed.min, speed.start - (speed.decrement * rows));
    invalid.rows = true;
}

function invalidateCourt() {
    invalid.court = true;
}

//JS is loaded;start listening to input
startGame();
