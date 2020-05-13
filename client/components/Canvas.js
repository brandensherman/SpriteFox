import React from 'react';
import socket from '../socket.js'

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.saveCanvas = this.saveCanvas.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fillPixel = this.fillPixel.bind(this);
    // this.fillPixelFromSocket = this.fillPixelFromSocket.bind(this)
    this.resetCanvas = this.resetCanvas.bind(this);
    this.state = {
      color: 'coral',
      canvasName: '',
      pixelSize: 24,
      gridSize: 16,
      framesArray: [],
      mappedGrid: {},
    };
  }
  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');

    this.createGrid(this.state.gridSize, this.state.pixelSize);

    socket.on("fill", (x, y, color) => {
      this.fillPixel(x, y, color)
    })
  }

  createGrid(rows, pixelSize) {
    let y = 0;
    for (let i = 0; i < rows; i++) {
      let x = 0;
      let array = [];
      for (let j = 0; j < rows; j++) {
        array.push(null);
        this.ctx.strokeRect(x, y, pixelSize, pixelSize);
        x += pixelSize;
      }
      // Add each array to the mappedGrid
      this.state.mappedGrid[i] = array;
      y += pixelSize;
    }
  }

  //saves canvas, adds it to array of canvases
  saveCanvas(canvasName) {
    // let imageURL = this.canvas.current.toDataURL();
    localStorage.setItem(
      `${canvasName}`,
      JSON.stringify(this.state.mappedGrid)
    );

    this.setState({
      framesArray: [...this.state.framesArray, canvasName],
    });
  }

  getCanvas(canvasName) {
    let item = JSON.parse(localStorage.getItem(canvasName));
    this.renderSaved(item);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // clear canvas, then render a saved canvas based on colors/coords
  renderSaved(savedGrid) {
    for (let key in savedGrid) {
      let pixelRow = savedGrid[key];

      for (let i = 0; i < pixelRow.length; i++) {
        if (pixelRow[i] !== null) {
          // These are the actual coordinates to render on the grid
          let coordinateX = i * this.state.pixelSize;
          let coordinateY = key * this.state.pixelSize;

          // Render each original pixel from the saved grid
          this.ctx.fillStyle = pixelRow[i];
          this.ctx.fillRect(
            coordinateX,
            coordinateY,
            this.state.pixelSize,
            this.state.pixelSize
          );
        }
      }
    }
  }

  resetCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.state.gridSize * this.state.pixelSize,
      this.state.gridSize * this.state.pixelSize
    );
    this.createGrid(this.state.gridSize, this.state.pixelSize);
  }

  fillPixel(defaultX, defaultY) { //need to add a color value to the parameters
    const canvas = this.canvas.current.getBoundingClientRect();

    // These are not the actual coordinates but correspond to the place on the grid
    let x = defaultX || Math.floor(
      (window.event.clientX - canvas.x) / this.state.pixelSize
    );
    let y = defaultY || Math.floor(
      (window.event.clientY - canvas.y) / this.state.pixelSize
    );

    if (defaultX === undefined && defaultY === undefined) {
      socket.emit("fill", x, y, "green")
    }

    // MAP color to proper place on mappedGrid
    this.state.mappedGrid[y][x] = this.state.color;

    // These are the actual coordinates to properly place the pixel

    let actualCoordinatesX = x * this.state.pixelSize;
    let actualCoordinatesY = y * this.state.pixelSize;


    this.ctx.fillStyle = this.state.color;
    this.ctx.fillRect(
      actualCoordinatesX,
      actualCoordinatesY,
      this.state.pixelSize,
      this.state.pixelSize
    );
  }

  render() {
    console.log(this.state.framesArray)
    return (
      <div>
        <label htmlFor='canvasName'></label>
        <input
          type='text'
          name='canvasName'
          value={this.state.canvasName}
          placeholder='Enter your name'
          onChange={this.handleChange}
        />
        <h1>hello world canvas test component</h1>
        <canvas
          width={this.state.gridSize * this.state.pixelSize}
          height={this.state.gridSize * this.state.pixelSize}
          ref={this.canvas}
          onClick={() => this.fillPixel()} //made this into an anonomous function so that we can pass in values at a different location
        />
        <ul>
          {this.state.framesArray.map((frame, index) => {
            return (
              <li onClick={() => this.getCanvas(frame)} key={index}>
                {frame}
              </li>
            );
          })}
        </ul>
        <button onClick={() => this.saveCanvas(this.state.canvasName)}>
          Save Canvas
        </button>
        <button onClick={this.resetCanvas}> RESET</button>
      </div>
    );
  }
}

export default Canvas;
