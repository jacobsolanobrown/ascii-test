// load an image
let img = new Image();
img.src = 'images/koyu.jpeg';
let canvas = document.getElementById('myCanvas');

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

    // now we can pixelate the image

    // create a pixelation function
    function pixelate(scale) {
        // get the 1d array of pixel data
        const pixelArray = ctx.getImageData(0, 0, w, h).data;

        // set the pixel size
        const pixelSize = scale;

        // loop through the image (2d) in blocks of pixelSize (iterate from top to bottom, left to right)
        for (let y = 0; y < h; y += pixelSize) { 
            for (let x = 0; x < w; x += pixelSize) {
                // once we have the pixel location on the 2d image, we need to get the corresponding index in the 1d pixel array
                const pixelIndex = (y * w + x) * 4;
                // get the rbga values stored in the 1d pixel array
                let red = pixelArray[pixelIndex + 0];
                let green = pixelArray[pixelIndex + 1];
                let blue = pixelArray[pixelIndex + 2];
                let alpha = pixelArray[pixelIndex + 3];
                
                // set the fill style to the pixel color
                ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
                // draw a rectangle at the pixel location (on the 2d array) with size of pixelSize (will increase the size of the "pixels")
                ctx.fillRect(x, y, pixelSize, pixelSize);
}       
}
    }
    // initial pixelation
    pixelate(10);

    // add an event listener to the slider to change the pixelation scale
    const slider = document.getElementById('pixelSlider');
    slider.addEventListener('input', function() {
        // clear the canvas
        ctx.clearRect(0, 0, w, h);
        // redraw the original image
        ctx.drawImage(img, 0, 0);
        // pixelate with the new scale
        pixelate(parseInt(this.value));
    });
}

// Log when the script loads
console.log('Script loaded successfully!');