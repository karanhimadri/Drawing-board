const canvas = document.getElementById("drawingCanvas");
const input = document.getElementById("input");
const setBtn = document.getElementById("btn");
const showWidth = document.getElementById("width");
const colors = document.querySelectorAll(".colr");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let drawColor = "black";
let lineWidth = 1;

setBtn.addEventListener("click", () => {
  let value = input.value;
  if (value) {
    lineWidth = value;
    showWidth.innerText = value;
    input.value = null;
  }
});

colors.forEach((color, index) => {
  color.addEventListener("click", (e) => {
    drawColor = color.style.backgroundColor;
    // Set the clicked color to 50px size
    color.style.width = "50px";
    color.style.height = "50px";

    // Iterate through other colors and reset their size if they are not clicked
    colors.forEach((otherColor, otherIndex) => {
      if (index !== otherIndex) {
        otherColor.style.width = "40px";
        otherColor.style.height = "40px";
      }
    });
  });
});

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Start drawing when the left mouse button is pressed
canvas.addEventListener("mousedown", function (e) {
  if (e.button === 0) {
    // Left-click
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY); // Start point
  }
});

// Draw line as the mouse moves
canvas.addEventListener("mousemove", function (e) {
  if (isDrawing) {
    ctx.lineTo(e.clientX, e.clientY); // Draw line to this point
    ctx.strokeStyle = drawColor; // Line color (change as desired)
    ctx.lineWidth = lineWidth; // Line width
    ctx.stroke();
  }
});

// Stop drawing when the left mouse button is released
canvas.addEventListener("mouseup", function (e) {
  if (e.button === 0) {
    // Left-click
    isDrawing = false;
    ctx.closePath();
  }
});

// Stop drawing if the mouse leaves the canvas
canvas.addEventListener("mouseleave", function () {
  isDrawing = false;
});
