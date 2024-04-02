// Initialize variables
let canvas, ctx;
let circles = [];
let rayLength = 100;
let rayAmount = 50;
let totalDegrees = 180;

// Function to initialize canvas and context, and set up event listeners
function init() {
    canvas = document.getElementById('rayCanvas');
    ctx = canvas.getContext('2d');
    
    // Resize canvas to fill the entire screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Add event listener for window resize to resize canvas accordingly
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw(); // Redraw circles and rays on resize
    });
    
    // Draw initial circles and rays
    draw();
    
    // Add event listeners for sliders
    document.getElementById('rayLength').addEventListener('input', updateRayLength);
    document.getElementById('rayAmount').addEventListener('input', updateRayAmount);
    document.getElementById('totalDegrees').addEventListener('input', updateTotalDegrees);
    
    // Add event listener to handle mouse movements for dragging circles
    canvas.addEventListener('mousedown', startDragging);
    canvas.addEventListener('mousemove', dragCircle);
    canvas.addEventListener('mouseup', stopDragging);
}

// Function to draw circles on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw each circle
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    });
    
    // Draw rays
    drawRays();
}

// Function to draw rays from each circle
function drawRays() {
    // Calculate angle increment based on total degrees and amount of rays
    const angleIncrement = totalDegrees / (rayAmount - 1);
    
    circles.forEach(circle => {
        for (let i = 0; i < rayAmount; i++) {
            const angle = (circle.angle + (angleIncrement * i)) * (Math.PI / 180);
            const endX = circle.x + Math.cos(angle) * rayLength;
            const endY = circle.y + Math.sin(angle) * rayLength;
            // Draw rays
            ctx.beginPath();
            ctx.moveTo(circle.x, circle.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
    });
}

// Function to update ray length based on slider input
function updateRayLength() {
    rayLength = parseInt(document.getElementById('rayLength').value);
    draw(); // Redraw circles and rays with updated parameters
}

// Function to update amount of rays based on slider input
function updateRayAmount() {
    rayAmount = parseInt(document.getElementById('rayAmount').value);
    draw(); // Redraw circles and rays with updated parameters
}

// Function to update total degrees based on slider input
function updateTotalDegrees() {
    totalDegrees = parseInt(document.getElementById('totalDegrees').value);
    draw(); // Redraw circles and rays with updated parameters
}

// Function to check if a point is inside a circle
function isInsideCircle(x, y, circle) {
    const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    return distance <= circle.radius;
}

// Function to make circles draggable
function startDragging(event) {
    circles.forEach(circle => {
        if (isInsideCircle(event.clientX, event.clientY, circle)) {
            circle.dragging = true;
        }
    });
}

// Function to drag circles
function dragCircle(event) {
    circles.forEach(circle => {
        if (circle.dragging) {
            circle.x = event.clientX;
            circle.y = event.clientY;
            draw(); // Redraw circles and rays while dragging
        }
    });
}

// Function to stop dragging circles
function stopDragging() {
    circles.forEach(circle => {
        circle.dragging = false;
    });
}

// Initialize canvas and set up event listeners
init();
