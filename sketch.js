let rows, cols;
let size = 40;
let grid = [];
let current;
let stack = [];

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  cols = floor(width / size);
  rows = floor(height / size);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid.push(new Cell(x, y));
    }
  }

  current = grid[0];
}

function draw() {
  background(51);

  grid.forEach((cell) => {
    cell.draw();
  });

  current.visited = true;
  current.highlight();
  var next = current.getRandomUnvisitedNeighbor();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function removeWalls(a, b) {
  let x = a.x - b.x;
  switch (x) {
    case -1:
      // remove a right wall, b left wall
      a.walls[1] = false;
      b.walls[3] = false;
      break;
    case 1:
      // remove a left wall, b right wall
      a.walls[3] = false;
      b.walls[1] = false;
      break;
  }
  let y = a.y - b.y;
  switch (y) {
    case -1:
      // remove a bottom wall, b top wall
      a.walls[2] = false;
      b.walls[0] = false;
      break;
    case 1:
      // remove a top wall, b bottom wall
      a.walls[0] = false;
      b.walls[2] = false;
      break;
  }
}
