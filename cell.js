class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // top, right, bottom, left
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  // calculate this cell's index into grid array
  getIndex(x, y) {
    if (x < 0 || x > cols - 1 || y < 0 || y > rows - 1) {
      // out of bounds
      return undefined;
    }
    return x + y * cols;
  }

  getRandomUnvisitedNeighbor() {
    let neighbors = [];
    let top = grid[this.getIndex(this.x, this.y - 1)];
    let right = grid[this.getIndex(this.x + 1, this.y)];
    let bottom = grid[this.getIndex(this.x, this.y + 1)];
    let left = grid[this.getIndex(this.x - 1, this.y)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  highlight() {
    let gridX = this.x * size;
    let gridY = this.y * size;
    noStroke();
    fill(0, 0, 255, 100);
    square(gridX, gridY, size);
  }

  draw() {
    let gridX = this.x * size;
    let gridY = this.y * size;

    if (this.visited) {
      fill(255, 0, 255, 100);
      noStroke();
      square(gridX, gridY, size);
    }

    stroke(255);
    this.walls.forEach((wall, i) => {
      if (wall) {
        switch (i) {
          case 0: // top
            line(gridX, gridY, gridX + size, gridY);
            break;
          case 1: // right
            line(gridX + size, gridY, gridX + size, gridY + size);
            break;
          case 2: // bottom
            line(gridX + size, gridY + size, gridX, gridY + size);
            break;
          case 3: // left
            line(gridX, gridY + size, gridX, gridY);
            break;
        }
      }
    });
  }
}
