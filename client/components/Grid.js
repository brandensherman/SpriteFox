// import React from 'react'

// //Global reference to canvas and context
// let ctx;
// let canvas;


// let currentColor = '#AAEEBB';
// let DEFAULT_COLOR = '#FFFFFF';
// let canvasData = new Array(NUM_ROWS * NUM_COLS).fill(DEFAULT_COLOR);

// class Grid extends React.Component {
//   constructor(props) {
//     super(props)
//     this.drawGrid = this.drawGrid.bind(this)
//   }

//   makeGrid() {
//     //-> WIDTH and HEIGHT have to be even multiple of NUM_ROWS & NUM_COLS
//     const WIDTH = 480; //px
//     const HEIGHT = 480; //px
//     // -> NUM_ROWS & NUM_COLS have to be even multiple of 16
//     const NUM_ROWS = 16;
//     const NUM_COLS = 16;
//     const BOX_SIDE_LENGTH = WIDTH / NUM_ROWS; //px

//   }

//   getCanvasAndContext() {
//     canvas = document.getElementById('editor');
//     ctx = canvas.getContext('2d');
//     ctx.imageSmoothingEnabled = false;
//     canvas.width = NUM_COLS * BOX_SIDE_LENGTH + 1; //+1 to display border
//     canvas.height = NUM_ROWS * BOX_SIDE_LENGTH + 1;
//   }

//   drawGrid() {
//     ctx.lineWidth = 0.5;
//     ctx.setTransform(1, 0, 0, 1, 0, 0); //reset transform
//     ctx.translate(0.5, 0.5); //make lines sharp
//     for (var i = 0; i <= WIDTH; i += SQUARE_SIDE) {
//       //draw vertical line HEIGHT length, x=i
//       ctx.beginPath();
//       ctx.moveTo(i, 0);
//       ctx.lineTo(i, HEIGHT);
//       ctx.stroke();
//       ctx.closePath();
//       //draw horizontal line WIDTH length, y=i
//       ctx.beginPath();
//       ctx.moveTo(0, i)
//       ctx.lineTo(WIDTH, i)
//       ctx.stroke();
//       ctx.closePath();
//     }
//     ctx.lineWidth = 0;
//   }

//   render() {

//     return (

//       <div>
//         <h1>Hello world from grid</h1>
//         <drawGrid />
//       </div>


//     )
//   }

// }

// export default Grid
