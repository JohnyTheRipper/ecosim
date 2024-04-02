// Function to handle circle behavior based on ray interruptions
function handleCircleBehavior(intersections) {
    if (intersections.length > 0) {
        // If there are intersections, update circle properties
        circle2.color = 'red'; // Change color to indicate intersection
        
        // Move circle1 towards circle2
        const dx = circle2.x - circle1.x;
        const dy = circle2.y - circle1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const speed = 2; // Adjust the speed as needed
        const moveX = (dx / distance) * speed;
        const moveY = (dy / distance) * speed;
        
        // Update circle1 position
        circle1.x += moveX;
        circle1.y += moveY;
    } else {
        // If no intersections, reset circle properties
        circle2.color = 'white'; // Reset color
        // Reset any other properties as needed
    }
}

// Function to calculate intersection points between a line and a circle
function intersectCircle(x1, y1, x2, y2, cx, cy, radius) {
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
