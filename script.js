// Variables to store game state
let gridSize, goldRow, goldCol, attempts;
let gameOver = false;

// Initializes and starts a new game
function initGame() {
  const gridElement = document.getElementById("grid");

  // Get selected grid size from dropdown
  gridSize = parseInt(document.getElementById("gridSize").value);

  // Reset grid and state
  gridElement.innerHTML = "";
  gameOver = false;
  attempts = 0;

  // Reset UI messages
  document.getElementById("message").textContent = "Click a cell to start mining!";
  document.getElementById("attempts").textContent = "";

  // Define grid layout based on selected size
  gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
  gridElement.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;

  // Randomly place the gold in the grid
  goldRow = Math.floor(Math.random() * gridSize);
  goldCol = Math.floor(Math.random() * gridSize);

  // Create the grid cells
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.onclick = handleClick; // Set click event handler
      gridElement.appendChild(cell);
    }
  }

}

// Handles user clicking on a grid cell
function handleClick(event) {
  // Ignore clicks after the game is won
  if (gameOver) return;

  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  // Only count new clicks (ignore re-clicking same cell)
  if (!cell.classList.contains("selected")) {
    cell.classList.add("selected"); // Mark as visited
    attempts++;
  }

  // Check if this is the gold location
  if (row === goldRow && col === goldCol) {
    cell.classList.add("found"); // Highlight the gold cell
    document.getElementById("message").textContent = "🎉 You found the gold!";
    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
    gameOver = true; // End the game
    return;
  }

  // Otherwise, show hint to help player move
  const direction = getMoveHint(row, col, goldRow, goldCol);
  document.getElementById("message").textContent = `Try again! Hint: ${direction}`;
}

// Generates directional hint based on player vs gold position
function getMoveHint(r1, c1, r2, c2) {
  let vertical = r2 > r1 ? "Move Bottom" : r2 < r1 ? "Move Top" : "";
  let horizontal = c2 > c1 ? "Move Right" : c2 < c1 ? "Move Left" : "";
  
  // Combine both directions if necessary (e.g., "Move Top and Move Left")
  return [vertical, horizontal].filter(Boolean).join(" and ");
}


// initially show 10x10 grid
gridSize = parseInt(document.getElementById("gridSize").value);
document.getElementById("gridSize").value = gridSize;
initGame(); // Start the game on page load
