import React from 'react'
import { SketchPicker } from 'react-color'

class Palette extends React.Component {
  constructor() {
    super();
    this.state = {
      background: '#fff'
    }
  }

  handleChangeComplete = color => {
    this.setState({ background: color.hex })
    console.log('>>>> this.state >>> ', this.state);
  }

  render() {
    return (
      <div>
        <SketchPicker
          color={this.state.background}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    )
  }
}

export default Palette
