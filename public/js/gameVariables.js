var iBlock = {
    size: 4,
    blocks: [0x0F00, 0x2222, 0x00F0, 0x4444],
    color: 'GAINSBORO'
};
var jBlock = {
    size: 3,
    blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20],
    color: 'SILVER'
};
var oBlock = {
    size: 2,
    blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00],
    color: 'SILVER'
};
var sBlock = {
    size: 3,
    blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620],
    color: 'GAINSBORO'
};
var tBlock = {
    size: 3,
    blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640],
    color: 'GAINSBORO'
};
var zBlock = {
    size: 3,
    blocks: [0x0C60, 0x4C80, 0xC600, 0x2640],
    color: 'SILVER'
};
var lBlock = {
    size: 3,
    blocks: [0x4460, 0x0E80, 0xC440, 0x2E00],
    color: 'GAINSBORO'
};

var gameCanvas = document.getElementById('canvas1');
var upcomingBlockCanvas = document.getElementById('upcoming');
var courtWidth = 10;
var courtHeight = 20;
var upcomingCourtSize = 5;

var KEY = { LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            ESC: 27,
            TAB: 9 };

var DIR = { UP: 0,
            RIGHT: 1,
            DOWN: 2,
            LEFT: 3,
            MIN: 0,
            MAX: 3 };

var speed = { start: 0.5,
              decrement: 0.08,
              min: 0.1 };

var invalid = {};
var gameCanvasContext = gameCanvas.getContext('2d');
var upcomingCanvasContext = upcomingBlockCanvas.getContext('2d');
var blockWidth, blockHeight, actionsQueue,
    current, next, playing, timePassed,
    rows, step, currentscore, displayedscore,
    index = 0, score = 0;