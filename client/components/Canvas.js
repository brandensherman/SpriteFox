import React from 'react';
import socket from '../socket.js';
import AnimateSprite from './AnimateSprite';
import Slider from 'react-input-slider';


let frames = [];
let counter = 0;

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.saveCanvas = this.saveCanvas.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fillPixel = this.fillPixel.bind(this);
    this.getFrames = this.getFrames.bind(this);
    this.animate = this.animate.bind(this);
    this.renderSaved = this.renderSaved.bind(this);
    // this.fillPixelFromSocket = this.fillPixelFromSocket.bind(this)
    this.resetCanvas = this.resetCanvas.bind(this);
    this.newSession = this.newSession.bind(this)
    this.setPixelSize = this.setPixelSize.bind(this);
    //this.changeFramesHandler = this.changeFramesHandler.bind(this)
    this.state = {
      canvasName: '',
      pixelSize: 24,
      factor: 3,
      framesArray: frames,
      mappedGrid: {},
      pngArray: [],
      frameCounter: 1,
      currentFrame: '',
      fps: 1
    };
  }

  componentDidMount() {
    this.getFrames()
    this.ctx = this.canvas.current.getContext('2d');
    this.createGrid();
    socket.on('fill', (x, y, color) => {
      this.fillPixel(x*this.state.factor, y*this.state.factor, color);
    });
  }

  createGrid() {
    let y = 0;
    let rows = 48
    for (let i = 0; i < rows; i++) {
      let x = 0;
      let array = [];
      for (let j = 0; j < rows; j++) {
        array.push(null);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.fillRect(x, y, this.state.pixelSize, this.state.pixelSize);
        x += this.state.pixelSize;
      }

      // Add each array to the mappedGrid
      this.state.mappedGrid[i] = array;
      y += this.state.pixelSize;
    }

  }

  getFrames() {
    for (let key in localStorage) {
      if (key !== 'currentColor' &&
        typeof localStorage[key] === 'string'
      ) {
        frames.push(key)
      }
    }
    this.setState({
      framesArray: [...this.state.framesArray]
    });
  }

  deleteFrame(canvasName) {
    const filteredArray = this.state.framesArray.filter(frame => (frame !== canvasName))
    localStorage.removeItem(canvasName)
    this.setState({
      framesArray: filteredArray
    })
  }

  //saves canvas, adds it to array of canvases
  saveCanvas(canvasName) {
    localStorage.setItem(
      `${canvasName}`,
      JSON.stringify(this.state.mappedGrid)
    );
      this.resetCanvas();
    this.setState({
      framesArray: [...this.state.framesArray, canvasName],
      canvasName: '',
      currentFrame: '',
    });
  }

  // Clears Storage, clears display of frames underneath grid, resets canvas
  newSession() {
    localStorage.clear();
    // or to remove only frames from loacal storage
    //this.state.framesArray.forEach(frame => (localStorage.removeItem(frame)))
    this.setState({
      frameCounter: 1,
      framesArray: [],
      currentFrame: ''
    });
    this.resetCanvas();
  }

  getCanvas(canvasName) {
    this.resetCanvas();
    let item = JSON.parse(localStorage.getItem(canvasName));
    this.renderSaved(item); // item = obj of arrays
    this.setState({
      currentFrame: canvasName
    });

  }

  setPixelSize(event) {
    let factor;
    let pixels = parseInt(event.target.value)
    if (pixels === 24) {
      factor = 3;
    } else if(pixels === 16) {
      factor = 2;
    } else if(pixels === 8) {
      factor = 1;
    }
    this.setState({
      pixelSize: pixels,
      factor: factor,
    })
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      currentFrame: event.target.value
    });
  }

  // clear canvas, then render a saved canvas based on colors/coords
  renderSaved(savedGrid) { // savedGrid = item = obj of arrays
    // console.log('renderSaved -> savedGrid = ', savedGrid)
    let pixelSize = 8;
    this.resetCanvas()
    for (let key in savedGrid) {
      // key = id = index of row array
      let pixelRow = savedGrid[key];
      for (let i = 0; i < pixelRow.length; i++) {

        if (pixelRow[i] !== null) {
          // These are the actual coordinates to render on the grid
          let coordinateX = i * pixelSize;
          let coordinateY = key * pixelSize;

          // Render each original pixel from the saved grid
          this.ctx.fillStyle = pixelRow[i];
          this.ctx.fillRect(
            coordinateX,
            coordinateY,
            pixelSize,
            pixelSize
          );
        }
      }
    }
  }

  animate() {
    console.log('animate!!!', this.state.framesArray)
    let len = this.state.framesArray.length;
    let interval = 0;
    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        this.getCanvas(this.state.framesArray[i])
      }, interval)
      counter++
      interval = interval + (1000 / this.state.fps);
    }
    setTimeout(() => {
      this.resetCanvas()
      this.setState({
        currentFrame: '',
      })
    }, interval)

  }

  resetCanvas() {
    this.ctx.clearRect(
      0,
      0,
      16 * 24,
      16 * 24
    );
    this.createGrid();
  }

  deletePixel(defaultX, defaultY) {
    const canvas = this.canvas.current.getBoundingClientRect();
    // These are not the actual coordinates but correspond to the place on the grid
    let x =
      defaultX ??
        Math.floor((window.event.clientX - canvas.x) / this.state.pixelSize);
    let y =
      defaultY ??
        Math.floor((window.event.clientY - canvas.y) / this.state.pixelSize);
    if (defaultX === undefined && defaultY === undefined) {
      socket.emit('delete', x, y);
    }
    // MAP color to proper place on mappedGrid
    this.state.mappedGrid[y][x] = null;
    // These are the actual coordinates to properly place the pixel
    let actualCoordinatesX = x * this.state.pixelSize;
    let actualCoordinatesY = y * this.state.pixelSize;
    this.ctx.clearRect(
      actualCoordinatesX,
      actualCoordinatesY,
      this.state.pixelSize,
      this.state.pixelSize
    );
  }

  fillPixel(defaultX, defaultY, color = this.props.color) {
    //need to add a color value to the parameters
    const canvas = this.canvas.current.getBoundingClientRect();

    // These are not the actual coordinates but correspond to the place on the grid
    let x =
      defaultX ??
        Math.floor((window.event.clientX - (canvas.x)) / (this.state.pixelSize));
    let y =
      defaultY ??
        Math.floor((window.event.clientY - (canvas.y)) / this.state.pixelSize);

    if (defaultX === undefined && defaultY === undefined) {
      socket.emit('fill', x, y, color);
    }

    // MAP color to proper place on mappedGrid
    for (let i = 0; i < this.state.factor; i++) {
      for (let j = 0; j < this.state.factor; j++) {

        this.state.mappedGrid[(y * this.state.factor) + i][(x* this.state.factor) + j] = color;
      }
    }

    // These are the actual coordinates to properly place the pixel
    let actualCoordinatesX = x * this.state.pixelSize;
    let actualCoordinatesY = y * this.state.pixelSize;

    this.ctx.fillStyle = color;

    this.ctx.fillRect(
      actualCoordinatesX,
      actualCoordinatesY,
      this.state.pixelSize,
      this.state.pixelSize
    );
  }
  /*
    async changeFramesHandler(e) {
      let frame = e.target.value;
      await this.setState({
        currentFrame: frame
      });
      this.getCanvas(this.state.currentFrame);
    }
  */

  render() {

    return (
      <div className='canvas-container'>
        <div className='container canvas-frames'>
          <div>
            <h3>CURRENT CANVAS : {this.state.currentFrame}</h3>
          </div>
          <div className='canvas'>
            <canvas
              className='real-canvas'
              width={16 * 24}
              height={16 * 24}
              ref={this.canvas}
              onClick={() => this.fillPixel()} //made this into an anonomous function so that we can pass in values at a different location
              onDoubleClick={() => this.deletePixel()}
            />
            <img
              className='checkered-background'
              src='checkeredBackground.png'
              width={16 * 24}
              height={16 * 24}
            />
            <canvas
              width={16 * 24}
              height={16 * 24}
            />
          </div>
          <hr />
          <h3>CHOOSE FRAME</h3>
          <hr />
          <div className='frames-container'>
            <ul>
              <div>
                {this.state.framesArray.map((frame, index) => {
                  return (
                    <li key={index}>
                      <button onClick={() => this.getCanvas(frame)} style={{ color: 'blue' }} >
                        Frame {index + 1}: {frame}
                      </button>
                      <button onClick={() => this.deleteFrame(frame)} style={{ float: 'right', color: 'red' }} > DELETE </button>
                    </li>
                  );
                })}
              </div>
            </ul>
          </div>
        </div>
        <div className='options-container'>
          <label htmlFor='canvasName'></label>
          <input
            type='text'
            name='canvasName'
            value={this.state.canvasName}
            placeholder='Enter Frame name'
            onChange={this.handleChange}
          />
          <button
            onClick={() => this.saveCanvas(this.state.currentFrame)}
            className='btn'
          >
            Save Frame
          </button>
          <button onClick={this.resetCanvas} className='btn'>
            Reset Canvas
          </button>
          <button onClick={this.newSession} className='btn' style={{ backgroundColor: 'red' }}>
            New Session
        </button>
          <button
            onClick={() => this.animate()}
            className='btn'
          >
            Animate!
        </button>

        <div className='slider-container'>
        <h3 className='slider-header'>{this.state.fps} FPS</h3>
        <div>
          <Slider
            xmax={25}
            xmin={1}
            axis='x'
            x={this.state.fps}
            onChange={({ x }) => this.setState({
              fps: x
              })}
            className='slider-bar'
          />
        </div>
      </div>

        <div style={{padding: '10px'}}>
        <h3>Pixel Size {this.state.pixelSize}</h3>
        <select onChange={this.setPixelSize}>
          <option value={24}>24 x 24</option>
          <option value={16}>16 x 16</option>
          <option value={8}>8 x 8</option>
        </select>

        </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
