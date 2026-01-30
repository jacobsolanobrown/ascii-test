// load an image
let img = new Image();
// change the image pathh once imgae uploaded 

// use file api to load an image and convert it to ascii art
document.getElementById('imageLoader').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});

let canvas = document.getElementById('myCanvas');
// to invert the ascii just invert the density array
const density = [' ', '_', '.', ',', '-', '=', '+', ':', ';', 'c', 'b', 'a', '!', '?', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', 'w', '#', '@', 'Ñ'];

// load the image to the canvas
img.onload = function() {
    // get the image dimensions
    w = img.width;
    h = img.height;

    // make the canvas the same size as the image
    canvas.width = w;
    canvas.height = h;

    // make the canvas context 2d
    ctx = canvas.getContext('2d'); 
    // draw the image to the canvas
    ctx.drawImage(img, 0, 0);

    ctx.font = "7pt Courier";
    ctx.textBaseline = "top";

    // now we can pixelate the image

    // create a pixelation function
    function toAscii(scale) {
        // get the 1d array of pixel data
        const pixelArray = ctx.getImageData(0, 0, w, h).data;

        // set the pixel size
        const pixelSize = scale;

        // get the output container
        const asciiOutput = document.getElementById('asciiOutput');
        asciiOutput.innerHTML = ''; // clear previous output

        // loop through the image (2d) in blocks of pixelSize (iterate from top to bottom, left to right)
        for (let y = 0; y < h; y += pixelSize) {
            let line = ''; // build up each line of ASCII
            for (let x = 0; x < w; x += pixelSize) {
                // once we have the pixel location on the 2d image, we need to get the corresponding index in the 1d pixel array
                const pixelIndex = (y * w + x) * 4;
                // get the rbga values stored in the 1d pixel array
                let red = pixelArray[pixelIndex + 0];
                let green = pixelArray[pixelIndex + 1];
                let blue = pixelArray[pixelIndex + 2];

                // calc density for ascii
                let brightnessLevel = (red + green + blue) / 3;
                console.log(brightnessLevel);

                // map the the density (0-255) to the ascii characters array length so it chooses the correct brightness
                let charIndex = Math.floor((brightnessLevel / 255) * (density.length - 1));
                console.log('charIndex',charIndex);
                // get the ascii character from the density array
                let asciiChar = density[charIndex];
                console.log(asciiChar);
                
                // add character to the current line
                line += asciiChar;
            }
            // create a div for this line and append it
            const lineDiv = document.createElement('div');
            lineDiv.className = 'ascii-line';
            // set the text content to the built line
            lineDiv.textContent = line;
            asciiOutput.appendChild(lineDiv);
        }
    }
    // initial ascii conversion
    toAscii(2);

    // add a event listener to the slider to change the ascii scale
    // const slider = document.getElementById('pixelSlider');
    // slider.addEventListener('input', function() {
    //     // convert to ascii with the new scale
    //     toAscii(parseInt(this.value));
    // });
}

// Export ascii art as image // TODO: add parameters for saving image (transparency, scale, etc)
document.getElementById('exportBtn').addEventListener('click', function() {
    const asciiOutput = document.getElementById('asciiOutput');
    // use html2canvas to capture the ascii output
    html2canvas(asciiOutput, {
        backgroundColor: '#00000000',
        scale: 2,  // Higher quality export
        width: asciiOutput.scrollWidth,
        height: asciiOutput.scrollHeight,
        windowWidth: asciiOutput.scrollWidth,
        windowHeight: asciiOutput.scrollHeight
    }).then(canvas => {
        // Convert canvas to downloadable image
        const link = document.createElement('a');
        link.download = 'ascii-art.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Log when the script loads
console.log('Script loaded successfully!');