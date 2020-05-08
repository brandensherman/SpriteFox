import React from 'react'

class PureCanvas extends React.Component {
  constructor() {
    super();
    this.state = {
      color: localStorage.getItem('currentColor')
    }
  }


  // shouldComponentUpdate() {
  //   return false
  // }

  render() {
    console.log('>>>> pure canvas color', this.state.color)
    return (
      <canvas
        className="canvas"
        // width="300"
        // height="300"
        ref={node =>
          node ? this.props.contextRef(node.getContext('2d')) : null
        }
      />
    )
  }
}

export default PureCanvas
