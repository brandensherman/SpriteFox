
const CANVAS_WIDTH =  576, // measured in screen pixels
const CANVAS_HEIGHT = 576, // measured in screen pixels
const CURSOR_SIZE= 5, // odd numbers only or it'll be off-center

// take screen coordinates and convert them to pixel coordinates
const convertCanvasToPixelCoords = (canvasMouseCoords, sprite) => {
  const canvasWidth = CANVAS_WIDTH;
  const canvasHeight = CANVAS_HEIGHT;
  const pixelWidth = sprite.frames[0].layers[0].pixels[0].length;
  const pixelHeight = sprite.frames[0].layers[0].pixels.length;
  const mouseX = canvasMouseCoords.x;
  const mouseY = canvasMouseCoords.y;

  const mouseXpixels = Math.floor(mouseX / (canvasWidth / pixelWidth));
  const mouseYpixels = Math.floor(mouseY / (canvasHeight / pixelHeight));

  return { x: mouseXpixels, y: mouseYpixels };
};
export default convertCanvasToPixelCoords;
