// game.js

// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the creatures' properties
let creature1 = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    color: 'white'
};

let creature2 = {
    x: canvas.width / 4,
    y: canvas.height / 4,
    radius: 15,
    color: 'white'
};

// Draw the creatures on the canvas
function drawCreatures() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(creature1.x, creature1.y, creature1.radius, 0, Math.PI * 2);
    ctx.fillStyle = creature1.color;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(creature2.x, creature2.y, creature2.radius, 0, Math.PI * 2);
    ctx.fillStyle = creature2.color;
    ctx.fill();
}

// Event listeners to update drawing when sliders change
document.getElementById('lineLength').addEventListener('input', function() {
    draw();
});
document.getElementById('numRays').addEventListener('input', function() {
    draw();
});
document.getElementById('totalDegrees').addEventListener('input', function() {
    draw();
});

// Function to draw ray tracing lines
function draw() {
    drawCreatures();

    // Define the length of the ray tracing lines
    const lineLength = parseInt(document.getElementById('lineLength').value);

    // Define the number of rays and the total degrees
    const numRays = parseInt(document.getElementById('numRays').value);
    const totalDegrees = parseInt(document.getElementById('totalDegrees').value);

    // Calculate the start and end angles
    const startAngle = Math.PI * (-totalDegrees / 2) / 180;
    const endAngle = Math.PI * (totalDegrees / 2) / 180;

    // Calculate the angle step
    const angleStep = (endAngle - startAngle) / (numRays - 1);

    // Draw ray tracing lines at specified intervals
    for (let i = 0; i < numRays; i++) {
        // Calculate the angle for this ray
        const angle = startAngle + i * angleStep;

        // Calculate the end point of the line
        const endX = creature1.x + lineLength * Math.cos(angle);
        const endY = creature1.y + lineLength * Math.sin(angle);

        // Check for intersection with creature2
        const intersections = intersectCreature(creature1.x, creature1.y, endX, endY, creature2.x, creature2.y, creature2.radius);
        
        // Call function to handle creature behavior based on ray interruptions
        handleCreatureBehavior(intersections);

        if (intersections.length > 0) {
            // If intersection occurs, set end point to first intersection point
            ctx.beginPath();
            ctx.moveTo(creature1.x, creature1.y);
            ctx.lineTo(intersections[0].x, intersections[0].y);
            ctx.strokeStyle = 'white';
            ctx.stroke();
        } else {
            // Draw the line
            ctx.beginPath();
            ctx.moveTo(creature1.x, creature1.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
    }
}

// Draw initial state
draw();

// Event listener for mouse down on the second creature
canvas.addEventListener('mousedown', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the mouse is within the second creature
    const dx = mouseX - creature2.x;
    const dy = mouseY - creature2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= creature2.radius) {
        // If mouse is inside the creature, set creature2 as draggable
        let isDragging = true;

        // Event listener for mouse move
        canvas.addEventListener('mousemove', function(event) {
            if (isDragging) {
                const rect = canvas.getBoundingClientRect();
                creature2.x = event.clientX - rect.left;
                creature2.y = event.clientY - rect.top;
                draw();
            }
        });

        // Event listener for mouse up
        canvas.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }
});

// Function to calculate intersection points between a line and a creature
function intersectCreature(x1, y1, x2, y2, cx, cy, radius) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const a = dx * dx + dy * dy;
    const b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
    const c = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - radius * radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        // No intersection
        return [];
    }

    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    const intersections = [];
    if (t1 >= 0 && t1 <= 1) {
        intersections.push({ x: x1 + t1 * dx, y: y1 + t1 * dy });
    }
    if (t2 >= 0 && t2 <= 1) {
        intersections.push({ x: x1 + t2 * dx, y: y1 + t2 * dy });
    }

    return intersections;
}

// Function to handle creature behavior based on ray interruptions
function handleCreatureBehavior(intersections) {
    if (intersections.length > 0) {
        // If there are intersections, update creature properties
        creature2.color = 'red'; // Change color to indicate intersection
        // Implement behavior based on ray interruptions
    } else {
        // If no intersections, reset creature properties
        creature2.color = 'white'; // Reset color
        // Reset any other properties as needed
    }
}
