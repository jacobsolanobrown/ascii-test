// Get DOM elements
const button = document.getElementById('clickBtn');
const output = document.getElementById('output');

let clickCount = 0;

// Add event listener to button
button.addEventListener('click', function() {
    clickCount++;
    output.innerHTML = `<p>Button clicked <strong>${clickCount}</strong> time${clickCount !== 1 ? 's' : ''}!</p>`;
    
    // Optional: Add some console logging
    console.log(`Button clicked! Total clicks: ${clickCount}`);
});

// Log when the script loads
console.log('Script loaded successfully!');

// get the canvas to draw the image
const canvas = document.getElementById('myCanvas');
// make the canvas context 2d
const ctx = canvas.getContext('2d'); 

// load an image
const img = new Image();
img.src = 'images/koyu.jpeg';

// load the image to the canvas
img.onload = function() {
    // draw the image to the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// how to we pixelate on image on the canvas ? i want to have the indices of the pixels so that we can map them to ascii characters s