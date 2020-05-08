import React from 'react'
import Grid from './Grid'



class CanvasTest extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
  }
  componentDidMount() {
    this.drawRectInCanvas()
  }

  drawRectInCanvas(){
    const ctx = this.canvas.current.getContext('2d') //// 3 - access node using .current
    ctx.strokeRect(0, 0, 20, 20)                     ////   - do something!
    ctx.strokeRect(20, 20, 20, 20)
  }

  render(){
    return (
      <div>
         <h1>hello world canvas test component</h1>
        <canvas width="700" height="500" ref={this.canvas} className='canvas' />
      </div>
    )
  }





  // render() {
  //   return (

  //     <div>
  //       <h1>hello world canvas test component</h1>
  //       <canvas width="700" height="500" ref={this.canvasRef} className='canvas' />


  //     </div>


  //   )
  // }
}

export default CanvasTest





