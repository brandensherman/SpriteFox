import React from 'react';
import convertCanvasToPixelCoords from '../render/convertCanvasToPixelCoords'
import convertWindowToCanvasCoords from '../render/convertWindowToCanvasCoords'

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.saveCanvas = this.saveCanvas.bind(this);
    this.getCanvas = this.getCanvas.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      canvasName: '',
      framesArray: [],
    };
  }
  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    //console.log("this.ctx is >>>>>>", this.ctx)

    this.createGrid(30, 20);
    console.log('this.canvas is >>>>>>', this.canvas);
  }

  createGrid(rows, pixelSize) {
    let y = 0;
    for (let i = 0; i < rows; i++) {
      let x = 0;
      for (let j = 0; j < rows; j++) {
        this.ctx.strokeRect(x, y, pixelSize, pixelSize);
        x += pixelSize;
        //console.log("x>>>", x, "y>>>>", y)
      }
      y += pixelSize;
    }
  }

  saveCanvas(canvasName) {
    let imageURL = this.canvas.current.toDataURL();
    localStorage.setItem(`${canvasName}`, imageURL);
  }

  getCanvas(canvasName) {
    let item = localStorage.getItem('canvas');
    console.log('ITEM', item);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
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
        <canvas width='500' height='500' ref={this.canvas} />
        <button onClick={() => this.saveCanvas(this.state.canvasName)}>
          Save Canvas
        </button>
        <button onClick={this.getCanvas}> Get Canvas</button>
      </div>
    );
  }
}

export default Canvas;
