// complex_code.js

// This code generates a maze using a recursive backtracking algorithm.
// The maze is rendered using HTML5 canvas and can be solved by the user.

// Define canvas dimensions
var canvas = document.getElementById("maze-canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define cell dimensions and maze dimensions
var cellSize = 20;
var numCellsX = Math.floor(canvas.width / cellSize);
var numCellsY = Math.floor(canvas.height / cellSize);
var maze = new Array(numCellsX);
for (var i = 0; i < maze.length; i++) {
  maze[i] = new Array(numCellsY);
}

// Initialize maze with walls
for (var x = 0; x < numCellsX; x++) {
  for (var y = 0; y < numCellsY; y++) {
    maze[x][y] = { visited: false, walls: [true, true, true, true] };
  }
}

// Generate maze starting from a random cell
var currentCell = { x: Math.floor(Math.random() * numCellsX), y: Math.floor(Math.random() * numCellsY) };
var stack = [];

function generateMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();

  maze[currentCell.x][currentCell.y].visited = true;
  var unvisitedNeighbors = getUnvisitedNeighbors(currentCell.x, currentCell.y);
  
  if (unvisitedNeighbors.length > 0) {
    var randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
    stack.push(currentCell);

    removeWalls(currentCell, randomNeighbor);
    currentCell = randomNeighbor;
  } else if (stack.length > 0) {
    currentCell = stack.pop();
  }

  if (stack.length > 0 || unvisitedNeighbors.length > 0) {
    requestAnimationFrame(generateMaze);
  } else {
    solveMaze();
  }
}

function getUnvisitedNeighbors(x, y) {
  var neighbors = [];
  if (x > 0 && !maze[x - 1][y].visited) {
    neighbors.push({ x: x - 1, y: y });
  }
  if (x < numCellsX - 1 && !maze[x + 1][y].visited) {
    neighbors.push({ x: x + 1, y: y });
  }
  if (y > 0 && !maze[x][y - 1].visited) {
    neighbors.push({ x: x, y: y - 1 });
  }
  if (y < numCellsY - 1 && !maze[x][y + 1].visited) {
    neighbors.push({ x: x, y: y + 1 });
  }
  return neighbors;
}

function removeWalls(cell1, cell2) {
  var dx = cell2.x - cell1.x;
  var dy = cell2.y - cell1.y;

  if (dx === 1) {
    maze[cell1.x][cell1.y].walls[1] = false;
    maze[cell2.x][cell2.y].walls[3] = false;
  } else if (dx === -1) {
    maze[cell1.x][cell1.y].walls[3] = false;
    maze[cell2.x][cell2.y].walls[1] = false;
  }
  if (dy === 1) {
    maze[cell1.x][cell1.y].walls[2] = false;
    maze[cell2.x][cell2.y].walls[0] = false;
  } else if (dy === -1) {
    maze[cell1.x][cell1.y].walls[0] = false;
    maze[cell2.x][cell2.y].walls[2] = false;
  }
}

function drawMaze() {
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (var x = 0; x < numCellsX; x++) {
    for (var y = 0; y < numCellsY; y++) {
      if (maze[x][y].walls[0]) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, y * cellSize);
        ctx.lineTo((x + 1) * cellSize, y * cellSize);
        ctx.stroke();
      }
      if (maze[x][y].walls[1]) {
        ctx.beginPath();
        ctx.moveTo((x + 1) * cellSize, y * cellSize);
        ctx.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
        ctx.stroke();
      }
      if (maze[x][y].walls[2]) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, (y + 1) * cellSize);
        ctx.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
        ctx.stroke();
      }
      if (maze[x][y].walls[3]) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, y * cellSize);
        ctx.lineTo(x * cellSize, (y + 1) * cellSize);
        ctx.stroke();
      }
    }
  }
}

function solveMaze() {
  // Maze solving logic goes here
}

generateMaze();