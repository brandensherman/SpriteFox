import React from 'react'
import Grid from './Grid'

class CanvasTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hexSize: 20
    }
  }

  componentWillMount() {
    this.setState({
      canvasSize: { canvasWidth: 800, canvasHeight: 600 }
    })
  }

  componentDidMount() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize
    this.canvasHex.width = canvasWidth;
    this.canvasHex.height = canvasHeight;
    this.drawHexes();

    drawHexes(){
      for (let r = 0; r <= 4; r++) {
        for (let q = 0; q <= 4; q++) {
          console.log(r, q)
        }
      }
    }

  }
}

export default CanvasTest





