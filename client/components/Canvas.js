import React from 'react'


class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }
  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d')
    //console.log("this.ctx is >>>>>>", this.ctx)

    this.createGrid(30, 20)
  }

  createGrid(rows, pixelSize) {
    let y = 0;
    for (let i = 0; i < rows; i++) {
      let x = 0;
      for (let j = 0; j < rows; j++) {

        this.ctx.strokeRect(x, y, pixelSize, pixelSize)
        x += pixelSize;
        //console.log("x>>>", x, "y>>>>", y)
      }
      y += pixelSize;
    }
  }


  render() {
    // console.log("this.ctx is >>>>>>", this.ctx)
    console.log("this.canvas is >>>>>>", this.canvas)
    return (
      <div>
        <h1>hello world canvas test component</h1>
        <canvas width="500" height="500" ref={this.canvas} />
      </div>
    )
  }

}

export default Canvas;
