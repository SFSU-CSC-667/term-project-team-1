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
//var canvas1  = get('canvas1');
//var canvas2  = get('canvas2');
//var ucanvas = get('upcoming');
var nx      = 10; // width of the court (in blocks)
    ny      = 20; // height of the court (in blocks)
    nu      = 5; // width/height of upcoming preview (in blocks)
var KEY     = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,ESC: 27,SPACE: 32 };

//variables
var dx, dy, actions,current,next;
var timePassed;
var pieces = [];

function run(){
  listenToEvents();


};

function listenToEvents() {
  document.addEventListener('keypress', keypress, false);
  //window.addEventListener('resize', resize, false);
};

function keypress(event){
  if(event.keyCode==KEY.SPACE){
    play();
  }
};

function play(){
  //code to start the game
  hide('start');
  reset();
};

function reset(){
  timePassed=0;
  clearActions();
  clearBlocks();
  clearScore();
  clearRows();
  setCurrentPiece(next);
  setNextPiece();
};
function hide(id){
  get(id).style.visibility = 'hidden';
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
function clearRows(){
  setRows(0);
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
function setNextPiece(piece)
{
  next    = piece || randomPiece();
  invalidateNext();
}

function invalidateNext(){
  invalid.next   = true;
}
function invalidate(){
  invalid.court  = true;
}


//JS is loaded;start listening to input
run();
