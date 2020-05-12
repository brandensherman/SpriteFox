import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'

function Palette() {
  const initialState = '#fff';
  const [currentColor, setColor] = useState(initialState)

  function handleChangeComplete(color) {
    setColor(color.hex)
  }

  useEffect(() => {
    document.title = currentColor;
  })

  return (
    <div>
      <SketchPicker
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
    </div>
  )

}

export default Palette
