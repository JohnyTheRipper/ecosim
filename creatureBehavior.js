// Function to handle creature behavior based on ray interruptions
function handleCreatureBehavior(intersections) {
    if (intersections.length > 0) {
        // If there are intersections, update creature properties
        creature2.color = 'red'; // Change color to indicate intersection
        
        // Move creature1 towards creature2
        const dx = creature2.x - creature1.x;
        const dy = creature2.y - creature1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const speed = 2; // Adjust the speed as needed
        const moveX = (dx / distance) * speed;
        const moveY = (dy / distance) * speed;
        
        // Update creature1 position
        creature1.x += moveX;
        creature1.y += moveY;

        // Update the direction of rays towards creature2
        const angleTowardsCreature2 = Math.atan2(dy, dx);
        creature1.rayDirection = angleTowardsCreature2;
    } else {
        // If no intersections, reset creature properties
        creature2.color = 'white'; // Reset color
        // Reset any other properties as needed
    }
}

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
