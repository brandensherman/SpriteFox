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
    this.fillPixelFromSocket = this.fillPixelFromSocket.bind(this)
    this.state = {
      color: 'black',
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
      this.fillPixelFromSocket(x, y, color)
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

      this.state.mappedGrid[i] = array;
      y += pixelSize;
    }
    // console.log('grid', this.state.mappedGrid);
  }

  saveCanvas(canvasName) {
    // let imageURL = this.canvas.current.toDataURL();
    // localStorage.setItem(`${canvasName}`, imageURL);
  }

  getCanvas(canvasName) {
    let item = localStorage.getItem('canvas');
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  fillPixelFromSocket(x, y, color){
    this.state.mappedGrid[y][x] = color;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x,
      y,
      this.state.pixelSize,
      this.state.pixelSize
    );


  }

  fillPixel() {
    const canvas = this.canvas.current.getBoundingClientRect();

    let x = Math.floor(
      (window.event.clientX - canvas.x) / this.state.pixelSize
    );
    let y = Math.floor(
      (window.event.clientY - canvas.y) / this.state.pixelSize
    );

    // These are not the actual coordinates but correspond to the place on the grid
    // console.log(x, y);

    // this.mapColorToGrid(x, y, this.state.color);

    // MAP color to proper place on mappedGrid
    this.state.mappedGrid[y][x] = this.state.color;

    // These are the actual coordinates to properly place the pixel

    let actualCoordinatesX = x * this.state.pixelSize;
    let actualCoordinatesY = y * this.state.pixelSize;

    socket.emit("fill", actualCoordinatesX, actualCoordinatesY, "green")

    this.ctx.fillStyle = this.state.color;
    this.ctx.fillRect(
      actualCoordinatesX,
      actualCoordinatesY,
      this.state.pixelSize,
      this.state.pixelSize
    );

    console.log('HEY', this.state.mappedGrid[y][x], x, y);
    console.log(this.state.mappedGrid);
  }

  render() {
    return (
      <div onClick={this.fillPixel}>
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
          onClick={this.fillPixel}
        />
        <button onClick={() => this.saveCanvas(this.state.canvasName)}>
          Save Canvas
        </button>
        <button onClick={this.getCanvas}> Get Canvas</button>
      </div>
    );
  }
}

export default Canvas;
