var cols, rows;
var w = 20;
var grid = [];
var stack = [];
var current;

function setup() {
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor(height/w);
  for (var i = 0; i < rows; i++){
    for (var j = 0; j < cols; j++){
      var cell = new Cell(j, i);
      grid.push(cell);
    }
  }
  current = grid[0];
  // frameRate(5);
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++){
    grid[i].show();
  }
  var next = current.checkNeighbors();
  current.visited = true;
  current.highlight();

  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1 ) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b){
  var x = a.i - b.i;
  var y = a.j - b.j;
  if (x === 1){
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  if (y === 1){
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
