import React from 'react'
import { SketchPicker } from 'react-color'

class Palette extends React.Component {
  constructor() {
    super();
    this.state = {
      currentColor: '#fff'
    }
  }

  handleChangeComplete = color => {
    this.setState({ currentColor: color.hex })
    console.log('>>>> this.state >>> ', this.state);
  }

  render() {
    return (
      <div>
        <SketchPicker
          color={this.state.currentColor}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    )
  }
}

export default Palette
