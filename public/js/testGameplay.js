//basic tetris blocks
//each item in the 'blocks' array represents a direction of orientation of the tetris block

var i = {size: 4, blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'GAINSBORO'};
var j = {size: 3, blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'SILVER'};
var o = {size: 2, blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'SILVER'};
var s = {size: 3, blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'GAINSBORO'};
var t = {size: 3, blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'GAINSBORO'};
var z = {size: 3, blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'SILVER'};
var l = {size: 3, blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'GAINSBORO'};

//constants
var canvas1 = get('canvas1');
var ucanvas = get('upcoming');
var courtWidth = 10; // width of the court
var courtHeight = 20; // height of the court
var upcomingCourtSize = 5; // width and height of upcoming view court
var KEY = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, ESC: 27, TAB: 9};
var DIR = {UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3};
var speed = {start: 0.5, decrement: 0.08, min: 0.1};
var invalid = {};

var context1 = canvas1.getContext('2d');
var ucontext = ucanvas.getContext('2d');
//variables
var blockWidth, blockHeight, actionsQueue, current, next, playing;
var timePassed;
var pieces = [];
var step;
var currentscore, displayedscore;
var index = 0;
var score = 0;

if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        }
}


//*
function run() {
    listenToEvents();
    var currentTime  = timestamp();
    var lastTime=timestamp();

    function frame() {
        currentTime = timestamp();
        update(Math.min(1, (currentTime - lastTime) / 1000.0));
        draw();

        lastTime = currentTime;
        requestAnimationFrame(frame, canvas1);
    }
    resize();
    reset();
    frame();
};

function listenToEvents() {
    document.addEventListener('keydown', keypress, false);
    window.addEventListener('resize', resize, false);
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
    else if (event.keyCode == KEY.TAB) {
        play();
        handled = true;
    }
    //prevent user from using the arrow keys for default browser functions
    if (handled)
        event.preventDefault();
};

function resize(event) {
    canvas1.width = canvas1.clientWidth;
    canvas1.height = canvas1.clientHeight;
    ucanvas.width = ucanvas.clientWidth;
    ucanvas.height = ucanvas.clientHeight;
    blockWidth = canvas1.width / courtWidth;
    blockHeight = canvas1.height / courtHeight;
    invalidate();
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
    invalidate();
    setScore(0);
    setRows(0);
    setCurrentPiece(next);
    setNextPiece();
};

//*
function draw() {
    //for game 1
    drawTetrisCourt();
    drawNextBlock();
    emitScore();
    drawHtmlForRows();
    context1.restore();
}

function drawTetrisCourt() {
    if (invalid.court) {
        context1.clearRect(0, 0, canvas1.width, canvas1.height);
        if (playing) {

        drawPiece(context1, current.type, current.x, current.y, current.dir);
        }
        var y=0, block;
        while(y<courtHeight){
            var x=0;
            while(x<courtWidth) {
                block = getBlock(x, y);
                if (block != null)
                    drawBlock(context1, x, y, block.color);
                x++;
            }
            y++;
        }
        context1.strokeRect(0, 0, courtWidth * blockWidth - 1, courtHeight * blockHeight - 1); // court boundary
        invalid.court = false;
    }
};

function drawNextBlock() {
    if (invalid.next) {
        var padding = (upcomingCourtSize - next.type.size) / 2;
        ucontext.save();
        ucontext.translate(0.5, 0.5);
        ucontext.clearRect(0, 0, upcomingCourtSize * blockWidth, upcomingCourtSize * blockHeight);
        drawPiece(ucontext, next.type, padding, padding, next.dir);
        ucontext.strokeStyle = 'black';
        ucontext.strokeRect(0, 0, upcomingCourtSize * blockWidth - 1, upcomingCourtSize * blockHeight - 1);
        ucontext.restore();
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
function handle(action) {
    if(action==DIR.LEFT){
        move(DIR.LEFT);
    }
    else if(action==DIR.RIGHT){
        move(DIR.RIGHT);
    }
    else if(action==DIR.UP){
        rotate();
    }
    else if(action==DIR.DOWN){
        drop();
    }
};

function move(direction) {
    var x = current.x, y = current.y;
    if(direction==DIR.LEFT){
        x=x-1;
    }
    else if(direction==DIR.RIGHT){
        x=x+1;
    }
    else if(direction==DIR.DOWN){
        y=y+1;
    }
    if (!occupied(current.type, x, y, current.dir)) {
        current.x = x;
        current.y = y;
        invalidate();
        return true;
    }
    else {
        return false;
    }
};

function rotate() {
    //change the direction clockwise
    var newdir = (current.dir == DIR.MAX ? DIR.MIN : current.dir + 1);
    if (!occupied(current.type, current.x, current.y, newdir)) {
        current.dir = newdir;
        invalidate();
    }
};

//*
function drop() {
    if (!move(DIR.DOWN)) {
        addScore(10);

        iterateBlock(current.type, current.x, current.y, current.dir, function (x, y) {
            setBlock(x, y, current.type);
        });

        removeLines();
        setCurrentPiece(next);
        setNextPiece();
        actionsQueue = [];
        if (occupied(current.type, current.x, current.y, current.dir)) {
            socket.emit("endOfGame", room);
        }
    }
};

function removeLines() {
    var xPosition, yPosition, done, numRows = 0;
    for (yPosition = courtHeight; yPosition > 0; --yPosition) {
        done = true;
        for (xPosition = 0; xPosition < courtWidth; ++xPosition) {
            if (!getBlock(xPosition, yPosition))
                done = false;
        }
        if (done) {
            removeLine(yPosition);
            yPosition = yPosition + 1;
            numRows++;
        }
    }
    if (numRows > 0) {
        addRows(numRows);
        addScore(100 * Math.pow(2, numRows - 1));
    }
}

function removeLine(position) {
    var xPosition, yPosition;
    for (yPosition = position; yPosition >= 0; --yPosition) {
        for (xPosition = 0; xPosition < courtWidth; ++xPosition)
            setBlock(xPosition, yPosition, (yPosition == 0) ? null : getBlock(xPosition, yPosition - 1));
    }
}

//iterate through the block
function iterateBlock(type, xPosition, yPosition, dir, fn) {
    var bit, row = 0, col = 0, blocks = type.blocks[dir];
    for (bit = 0x8000; bit > 0; bit = bit >> 1) {
        if (blocks & bit) {
            fn(xPosition + col, yPosition + row);
        }
        if (++col === 4) {
            col = 0;
            ++row;
        }
    }
}

//check if block can be shifted to a position
function occupied(type, xPosition, yPosition, dir) {
    var result = false;
    iterateBlock(type, xPosition, yPosition, dir, function (xPosition, yPosition) {
        if ((xPosition < 0) || (xPosition >= courtWidth) || (yPosition < 0) || (yPosition >= courtHeight) || getBlock(xPosition, yPosition))
            result = true;
    });
    return result;
};


function show(id) {
    get(id).style.visibility = null;
};

function setScore(n) {
    currentscore = n;
    setdisplayedScore(n);
};
function addScore(n) {
    currentscore = currentscore + n;
};

function setdisplayedScore(n) {
    displayedscore = n || currentscore;
    invalid.currentscore = true;
};

function setCurrentPiece(piece) {
    current = piece || randomPiece();
    invalidate();
};
function randomPiece() {

    pieces = [i, j, l, o, s, t, z, i, j, l, o, s, t, z, i, j, l, o, s, t, z, i, j, l, o, s, t, z];

    var type = pieces[index];
    index++;
    if (index >= 28)
    {
        index = 0;
    }


    return {type: type, dir: DIR.UP, x: courtWidth - type.size, y: 0};
};

function get(id) {
    return document.getElementById(id);
};

function getBlock(x, y) {
    return (blocks && blocks[x] ? blocks[x][y] : null);
};

function random(min, max) {
    return (min + (Math.random() * (max - min)));
};

function timestamp() {
    return new Date().getTime();
}

function setBlock(xPosition, yPosition, type) {
    blocks[xPosition] = blocks[xPosition] || [];
    blocks[xPosition][yPosition] = type;
    invalidate();
};

function addRows(n) {
    setRows(rows + n);
}

function setNextPiece(piece) {

    next = piece || randomPiece();
    invalid.next = true;
}
function drawHtml(id, html) {
    get(id).innerHTML = html;
}
function setRows(n) {
    rows=n;
    step = Math.max(speed.min, speed.start - (speed.decrement * rows));
    invalid.rows = true;
}

function invalidate() {
    invalid.court = true;
}

//JS is loaded;start listening to input
run();