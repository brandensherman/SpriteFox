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
    //just inserted
    this.getFrames = this.getFrames.bind(this);
    this.animate = this.animate.bind(this);
    this.renderSaved = this.renderSaved.bind(this);
    // this.fillPixelFromSocket = this.fillPixelFromSocket.bind(this)
    this.resetCanvas = this.resetCanvas.bind(this);
    this.newFrame = this.newFrame.bind(this);
    //this.changeFramesHandler = this.changeFramesHandler.bind(this)
    this.state = {
      canvasName: '',
      pixelSize: 24,
      gridSize: 16,
      framesArray: frames,
      mappedGrid: {},
      pngArray: [],
      frameCounter: 2,
      currentFrame: '',
      fps: 1
    };
  }

  // componentDidUpdate() {
  //   if (frames.length < 1) {
  //     this.getFrames()
  //   }
  // }

  componentDidMount() {
    this.getFrames()
    console.log('frames logged in compdidmount >>> ', frames)
    console.log('framesArray on state in compdidmount >>> ', this.state.framesArray)

    this.ctx = this.canvas.current.getContext('2d');
    this.createGrid(this.state.gridSize, this.state.pixelSize);
    socket.on('fill', (x, y, color) => {
      this.fillPixel(x, y, color);
    });
  }

  createGrid(rows) {
    let y = 0;
    let numOfBoxes = rows
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
    // console.log('frames logged in compdidmount >>> ', frames)
    // console.log('framesArray on state in compdidmount >>> ', this.state.framesArray)

  }

  newFrame() {
    localStorage.setItem(
      `frame ${this.state.frameCounter}`,
      JSON.stringify(this.state.mappedGrid)
    );
    this.setState({
      framesArray: [...this.state.framesArray, `frame ${this.state.frameCounter}`],
      frameCounter: this.state.frameCounter + 1
      //`frame ${counter}`: '',
    });
  }

  deleteFrame(canvasName) {
    const filteredArray = this.state.framesArray.filter(frame => (frame !== canvasName))
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

  getCanvas(canvasName) {
    this.resetCanvas();
    let item = JSON.parse(localStorage.getItem(canvasName));
    this.renderSaved(item);
    this.setState({
      currentFrame: canvasName
    });

  }

  setPixelSize(pixels) {
    let rows = 0;
    if (pixels === 24) rows = 16;
    else if(pixels === 16) rows = 24;
    else if(pixels === 8) rows = 48;

    this.setState({
      pixelSize: pixels,
      gridSize: rows
    })
    this.createGrid(rows, pixels);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      currentFrame: event.target.value
    });
  }

  // clear canvas, then render a saved canvas based on colors/coords
  renderSaved(savedGrid) {
    // console.log('renderSaved -> savedGrid = ', savedGrid[0])
    let pixelSize = 0;
    if (savedGrid[0].length === 16) pixelSize = 24;
    else if (savedGrid[0].length === 24) pixelSize = 16;
    else if (savedGrid[0].length === 48) pixelSize = 8;
    this.resetCanvas()
    for (let key in savedGrid) {
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
  }

  resetCanvas() {
    this.ctx.clearRect(
      0,
      0,
      16 * 24,
      16 * 24
    );
    this.createGrid(this.state.gridSize);
  }

  fillPixel(defaultX, defaultY, color = this.props.color) {
    //need to add a color value to the parameters
    const canvas = this.canvas.current.getBoundingClientRect();

    // These are not the actual coordinates but correspond to the place on the grid
    let x =
      defaultX ??
        Math.floor((window.event.clientX - canvas.x) / this.state.pixelSize);
    let y =
      defaultY ??
        Math.floor((window.event.clientY - canvas.y) / this.state.pixelSize);

    if (defaultX === undefined && defaultY === undefined) {
      socket.emit('fill', x, y, color);
    }
    // console.log('>>> x = ', x)
    // console.log('>>> y = ', y)
    // console.log('>>> client.x = ', window.event.clientX)
    // console.log('>>> client.y = ', window.event.clientY)

    // MAP color to proper place on mappedGrid
    this.state.mappedGrid[y][x] = color;

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
            <h3>CURRENT CANVAS {this.state.currentFrame}</h3>
          </div>
          <div className='canvas'>
            <canvas
              className='real-canvas'
              width={16 * 24}
              height={16 * 24}
              ref={this.canvas}
              onClick={() => this.fillPixel()} //made this into an anonomous function so that we can pass in values at a different location
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
          <hr/>
          <h3>CHOOSE FRAME</h3>
          <hr/>
          <div className='frames-container'>
            <ul>
            <div>
                {/* { */}

                  {/* frames.length >= this.state.framesArray ?
                    frames.map((frame, index) => {
                      return (
                        <li onClick={() => this.getCanvas(frame)} key={index}>
                          <span>Frame {index + 1}: {frame}</span>
                        </li>
                      );
                    })
                :  */}

                {this.state.framesArray.map((frame, index) => {
                return (
                  <li key={index}>
                    <button onClick={() => this.getCanvas(frame)} style={{color: 'blue'}} >
                    Frame {index + 1}: {frame}
                    </button>
                    <button onClick={() => this.deleteFrame(frame)} style={{float: 'right', color: 'red'}} > DELETE </button>
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
            placeholder='Enter your name'
            onChange={this.handleChange}
          />
          <button
            onClick={() => this.saveCanvas(this.state.currentFrame)}
            className='btn'
          >
            Save Canvas
          </button>
          <button onClick={this.resetCanvas} className='btn'>
            {' '}
            Reset Canvas
          </button>
          <button onClick={this.newFrame} className='btn'>
            {' '}
            New Frame
        </button>
          <div>
            <button
              onClick={() => this.getFrames()}
              className='btn'
            >
              Load Frames
        </button>
          </div>

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
        <Slider
            xmax={24}
            xmin={8}
            axis='x'
            xstep={8}
            x={this.state.pixelSize}
            onChange={({ x }) => this.setPixelSize(x)}
          />
        </div>



          {/* <div>
            <AnimateSprite />
          </div>
          <div>
            <ToggleAnimationEditModes />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Canvas;
