function getSpiralOrder(rows, cols) {
  const order = [];
  let top = 0, bottom = rows - 1, left = 0, right = cols - 1;
  while (top <= bottom && left <= right) {
    // Traverse right
    for (let i = left; i <= right; i++) order.push(top * cols + i);
    top++;
    // Traverse down
    for (let i = top; i <= bottom; i++) order.push(i * cols + right);
    right--;
    // Traverse left
    if (top <= bottom) {
      for (let i = right; i >= left; i--) order.push(bottom * cols + i);
      bottom--;
    }
    // Traverse up
    if (left <= right) {
      for (let i = bottom; i >= top; i--) order.push(i * cols + left);
      left++;
    }
  }
  return order;
}

export function drawlogo() {
  let grid = Array.from({ length: 10 }, () => Array(9).fill(0));
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 9; i++) {
      if (i <= 4) {
        if (j == 0) {
          if (i != 4) {
            grid[j][i] = 1;
          }
        } else if (j == 1 || j == 8 ) {
          grid[j][i] = 1;
        } else if (j > 1 && j < 8 && i!=2) {
          grid[j][i] = 1;
        } else {
          if (j ==9 && i!=0) {
            grid[j][i] = 1;
          }
        }
      } else if (i > 4) {
        if (j == 0) {
          if (i < 8 && i> 5) {
            grid[j][i] = 1;
          }
        } else if (j < 9) {
          if (i == 7 || i == 8) {
            grid[j][i] = 1;
          }
        } else {
          if (i == 8) {
            grid[j][i] = 1;
          }
        }
      }
    }
  }
  console.log(grid)
  return grid;
}

export function styleGridByTime() {
  const gridElement = document.getElementById('title-panel-grid');
  if (!gridElement) return;

  const cells = gridElement.children;
  const logoColor = '#00d4ff';

  // Function to generate spiral order indices
  const getSpiralOrder = () => {
    const rows = 10;
    const cols = 9;
    const spiral = [];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    let top = 0, bottom = rows - 1, left = 0, right = cols - 1;

    while (top <= bottom && left <= right) {
      // Traverse right
      for (let col = left; col <= right; col++) {
        if (!visited[top][col]) {
          spiral.push(top * cols + col);
          visited[top][col] = true;
        }
      }
      top++;

      // Traverse down
      for (let row = top; row <= bottom; row++) {
        if (!visited[row][right]) {
          spiral.push(row * cols + right);
          visited[row][right] = true;
        }
      }
      right--;

      // Traverse left
      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          if (!visited[bottom][col]) {
            spiral.push(bottom * cols + col);
            visited[bottom][col] = true;
          }
        }
        bottom--;
      }

      // Traverse up
      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          if (!visited[row][left]) {
            spiral.push(row * cols + left);
            visited[row][left] = true;
          }
        }
        left++;
      }
    }

    return spiral;
  };

  const animate = () => {
    // Get the logo grid from drawlogo function
    const logoGrid = drawlogo();

    // Assign logo color for logo cells
    const cellColors = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 9; col++) {
        if (logoGrid[row][col] === 1) {
          cellColors.push(logoColor);
        } else {
          cellColors.push('black');
        }
      }
    }

    // Set all cells to black initially
    for (let cell of cells) {
      cell.style.backgroundColor = 'black';
    }

    // Get spiral order
    const spiralOrder = getSpiralOrder();

    // Animate cells appearing in spiral order over 10 seconds
    const totalCells = 90;
    const animationDuration = 10000; // 10 seconds
    const delayPerCell = animationDuration / totalCells;

    spiralOrder.forEach((cellIndex, i) => {
      setTimeout(() => {
        if (cells[cellIndex]) {
          cells[cellIndex].style.backgroundColor = cellColors[cellIndex];
        }
      }, i * delayPerCell);
    });

    // After all cells have appeared (10 seconds), hold the logo for 10 seconds, then start cycling colors
    setTimeout(() => {
      // Start cycling: toggle each cell's color every 500ms
      const cycleInterval = setInterval(() => {
        for (let i = 0; i < totalCells; i++) {
          const cellIndex = i;
          if (cells[cellIndex]) {
            const currentColor = cells[cellIndex].style.backgroundColor;
            const assignedColor = cellColors[i];
            cells[cellIndex].style.backgroundColor = currentColor === assignedColor ? 'black' : assignedColor;
          }
        }
      }, 500);

      // After 10 seconds of cycling, stop cycling, reset to black, and repeat animation
      setTimeout(() => {
        clearInterval(cycleInterval);
        animate();
      }, 10000);
    }, animationDuration);
  };

  // Start the animation
  animate();
}
