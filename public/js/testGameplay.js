//basic tetris blocks
//each item in the 'blocks' array represents a direction of orientation of the tetris block

var i = { size: 4, blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'GAINSBORO'   };
var j = { size: 3, blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'SILVER'   };
var o = { size: 2, blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'SILVER' };
var s = { size: 3, blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'GAINSBORO'  };
var t = { size: 3, blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'GAINSBORO' };
var z = { size: 3, blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'SILVER'    };
var l = { size: 3, blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'GAINSBORO' };

//constants
var canvas1  = get('canvas1');
var ucanvas = get('upcoming');
var nx      = 10; // width of the canvas
    ny      = 20; // height of the canvas
    nu      = 5; // width and height of upcoming block
var KEY     = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,ESC: 27,TAB: 9 };
var DIR     = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3 };
var speed   = { start: 0.5, decrement: 0.08, min: 0.1 };

var context1 = canvas1.getContext('2d');
var ucontext = ucanvas.getContext('2d');
//variables
var dx, dy, actions,current,next,playing;
var timePassed;
var pieces = [];
var step;
var currentscore,displayedscore;

if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
                                 window.mozRequestAnimationFrame    ||
                                 window.oRequestAnimationFrame      ||
                                 window.msRequestAnimationFrame     ||
                                 function(callback, element) {
                                   window.setTimeout(callback, 1000 / 60);
                                 }
}


//*
function run(){
  listenToEvents();
  var now=last=timestamp();


  function frame() {
    now = timestamp();
    update(Math.min(1,(now-last)/1000.0));
    draw();

    last = now;
    requestAnimationFrame(frame,canvas1);
  }
  resize();
  reset();
  frame();
};

function listenToEvents() {
  document.addEventListener('keydown', keypress, false);
  window.addEventListener('resize', resize, false);
};


function keypress(event){
  var handled=false;
  if (playing) {
    switch(event.keyCode) {
      case KEY.LEFT:   actions.push(DIR.LEFT);  handled = true; break;
      case KEY.RIGHT:  actions.push(DIR.RIGHT); handled = true; break;
      case KEY.UP:     actions.push(DIR.UP);    handled = true; break;
      case KEY.DOWN:   actions.push(DIR.DOWN);  handled = true; break;
      case KEY.ESC:    end();                  handled = true; break;
    }
  }
  else if(event.keyCode==KEY.TAB){
    play();
    handled=true;
  }
  if (handled)
    event.preventDefault();
};

function resize(event){
  canvas1.width   = canvas1.clientWidth;  // set canvas logical size equal to its physical size
  canvas1.height  = canvas1.clientHeight; // (ditto)
  ucanvas.width  = ucanvas.clientWidth;
  ucanvas.height = ucanvas.clientHeight;
  dx = canvas1.width  / nx; // pixel size of a single tetris block
  dy = canvas1.height / ny; // (ditto)
  invalidate();
  invalidateNext();
};


function play(){
  //code to start the game
  hide('start');
  reset();
  playing=true;
};

function end(){
  show('start');
    setdisplayedScore();
  playing = false;
  var finalscore=document.getElementById('score').innerHTML;
  updateScore(finalscore);
}

function reset(){
  timePassed=0;
  clearActions();
  clearBlocks();
  clearScore();
  clearRows();
  setCurrentPiece(next);
  setNextPiece();
};

//*
function draw(){
  //for game 1
  context1.save();
  context1.lineWidth=1;
  context1.translate(0.5,0.5);

  drawCourt();
  drawNext();
  drawScore();
  drawRows();
  context1.restore();
}

function drawCourt(){
  if (invalid.court) {
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
    if (playing)
      drawPiece(context1, current.type, current.x, current.y, current.dir);
    var x, y, block;
    for(y = 0 ; y < ny ; y++) {
      for (x = 0 ; x < nx ; x++) {
        if (block = getBlock(x,y))
          drawBlock(context1, x, y, block.color);
      }
    }
    context1.strokeRect(0, 0, nx*dx - 1, ny*dy - 1); // court boundary
    invalid.court = false;
  }
};

function drawNext(){
  if (invalid.next) {
    var padding = (nu - next.type.size) / 2;
    ucontext.save();
    ucontext.translate(0.5, 0.5);
    ucontext.clearRect(0, 0, nu*dx, nu*dy);
    drawPiece(ucontext, next.type, padding, padding, next.dir);
    ucontext.strokeStyle = 'black';
    ucontext.strokeRect(0, 0, nu*dx - 1, nu*dy - 1);
    ucontext.restore();
    invalid.next = false;
  }
};

function drawPiece(context, type, x, y, dir) {
  eachblock(type, x, y, dir, function(x, y) {
    drawBlock(context, x, y, type.color);
  });
};

function drawBlock(context, x, y, color){
  context.fillStyle = color;
  context.fillRect(x*dx, y*dy, dx, dy);
  context.strokeRect(x*dx, y*dy, dx, dy);
};

function drawRows(){
  if (invalid.rows) {
    drawHtml('rows', rows);
    invalid.rows = false;
  }
};
function drawScore() {
  if (invalid.currentscore) {
    drawHtml('score', ("00000" + Math.floor(displayedscore)).slice(-5));
    invalid.currentscore = false;
  }
};
//*
function update(time){
  if (playing) {
    if (displayedscore < currentscore)
      setdisplayedScore(displayedscore + 1);
    handle(actions.shift());
    timePassed=timePassed+time;
    if (timePassed > step) {
      timePassed = timePassed - step;
      drop();
    }
  }
};
function handle(action){
  switch(action) {
    case DIR.LEFT:  move(DIR.LEFT);  break;
    case DIR.RIGHT: move(DIR.RIGHT); break;
    case DIR.UP:    rotate();        break;
    case DIR.DOWN:  drop();          break;
  }
};

function move(direction){
  var x = current.x, y = current.y;
  switch(direction) {
    case DIR.RIGHT: x = x + 1; break;
    case DIR.LEFT:  x = x - 1; break;
    case DIR.DOWN:  y = y + 1; break;
  }
  if (unoccupied(current.type, x, y, current.dir)) {
    current.x = x;
    current.y = y;
    invalidate();
    return true;
  }
  else {
    return false;
  }
};

function rotate(){
  var newdir = (current.dir == DIR.MAX ? DIR.MIN : current.dir + 1);
  if (unoccupied(current.type, current.x, current.y, newdir)) {
    current.dir = newdir;
    invalidate();
  }
};

//*
function drop(){
  if (!move(DIR.DOWN)) {
    addScore(10);
    dropBlock();
    removeLines();
    setCurrentPiece(next);
    setNextPiece(randomPiece());
    clearActions();
    if (occupied(current.type, current.x, current.y, current.dir)) {
      end();
    }
  }
};

function dropBlock() {
  eachblock(current.type, current.x, current.y, current.dir, function(x, y) {
    setBlock(x, y, current.type);
  });
}

function removeLines() {
  var x, y, complete, n = 0;
  for(y = ny ; y > 0 ; --y) {
    complete = true;
    for(x = 0 ; x < nx ; ++x) {
      if (!getBlock(x, y))
        complete = false;
    }
    if (complete) {
      removeLine(y);
      y = y + 1; // recheck same line
      n++;
    }
  }
  if (n > 0) {
    addRows(n);
    addScore(100*Math.pow(2,n-1)); // 1: 100, 2: 200, 3: 400, 4: 800
  }
}

function removeLine(n) {
      var x, y;
      for(y = n ; y >= 0 ; --y) {
        for(x = 0 ; x < nx ; ++x)
          setBlock(x, y, (y == 0) ? null : getBlock(x, y-1));
      }
    }

//iterate through the block
function eachblock(type, x, y, dir, fn) {
  var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
  for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
    if (blocks & bit) {
      fn(x + col, y + row);
    }
    if (++col === 4) {
      col = 0;
      ++row;
    }
  }
}

//check if the block can be moved to the intended position
function occupied(type, x, y, dir) {
  var result = false
  eachblock(type, x, y, dir, function(x, y) {
    if ((x < 0) || (x >= nx) || (y < 0) || (y >= ny) || getBlock(x,y))
      result = true;
  });
  return result;
}
function unoccupied(type, x, y, dir) {
  return !occupied(type, x, y, dir);
}

function hide(id){
  get(id).style.visibility = 'hidden';
};
function show(id)
{
  get(id).style.visibility = null;
};
function clearActions(){
  actions = [];
};
function clearBlocks(){
  blocks = []; invalidate();
};
function clearScore(){
  setScore(0);
};
function setScore(n){
  currentscore = n;
  setdisplayedScore(n);
};
function addScore(n){
  currentscore = currentscore + n;
};
function clearRows(){
  setRows(0);
};
function setdisplayedScore(n){
  displayedscore = n || currentscore;
  invalidateScore();
};

function setCurrentPiece(piece){
  current = piece || randomPiece();
  invalidate();
};
function randomPiece(){
  if (pieces.length == 0)
    pieces = [i,i,i,i,j,j,j,j,l,l,l,l,o,o,o,o,s,s,s,s,t,t,t,t,z,z,z,z];
  var type = pieces.splice(random(0, pieces.length-1), 1)[0];
  return { type: type, dir: DIR.UP, x: Math.round(random(0, nx - type.size)), y: 0 };
};

function get(id){
  return document.getElementById(id);
};

function getBlock(x,y){
  return (blocks && blocks[x] ? blocks[x][y] : null);
};

function random(min, max){
  return (min + (Math.random() * (max - min)));
};

function timestamp(){
  return new Date().getTime();
}

function setBlock(x,y,type){
  blocks[x] = blocks[x] || [];
  blocks[x][y] = type;
  invalidate();
};

function addRows(n){
  setRows(rows + n);
}

function setNextPiece(piece)
{
  next    = piece || randomPiece();
  invalidateNext();
}
function drawHtml(id, html){
  get(id).innerHTML = html;
};
function setRows(n){
  rows = n;
  step = Math.max(speed.min, speed.start - (speed.decrement*rows));
  invalidateRows();
};

var invalid = {};
function invalidateNext(){
  invalid.next   = true;
};
function invalidate(){
  invalid.court  = true;
};
function invalidateRows(){
  invalid.rows   = true;
};
function invalidateScore(){
  invalid.currentscore  = true;
};
//JS is loaded;start listening to input
run();
