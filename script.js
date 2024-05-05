document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector("#tetris-board");
  let squares = [];

  const width = 10;
  const height = 20;

  // Create Board
  function createBoard() {
    for (let i = 0; i < width * height; i++) {
      const square = document.createElement("div");
      square.classList.add("tetris-block");
      board.appendChild(square);
    }
    squares = Array.from(board.querySelectorAll("div"));
  }

  createBoard();

  // Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2], // Initial rotation
    [width, width + 1, width + 2, width * 2 + 2], // 90 degrees rotation
    [1, width + 1, width * 2 + 1, width * 2], // 180 degrees rotation
    [width, width * 2, width * 2 + 1, width * 2 + 2], // 270 degrees rotation
  ];

  let currentRotation = 0;
  let current = lTetromino[currentRotation];
  let currentPosition = 4;

  // Draw the Tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("filled");
    });
  }

  // Undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("filled");
    });
  }

  // Move Down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Freeze function
  function freeze() {
    if (
      current.some(
        (index) =>
          currentPosition + index + width >= width * height ||
          squares[currentPosition + index + width].classList.contains("filled")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("filled")
      );
      // Start a new Tetromino falling
      currentRotation = Math.floor(Math.random() * lTetromino.length);
      current = lTetromino[currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // Add keyboard controls
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    } else if (e.keyCode === 38) {
      rotate();
    }
  }

  document.addEventListener("keydown", control);

  // Left move function
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("filled")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  // Right move function
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isAtRightEdge) currentPosition += 1;
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("filled")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  // Rotate Tetromino
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      // If the current rotation gets to 4, make it go back to 0
      currentRotation = 0;
    }
    current = lTetromino[currentRotation];
    draw();
  }

  // Start game
  setInterval(moveDown, 1000);
});
