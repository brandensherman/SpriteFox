import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ currentColor }) => {
  const [color, setColor] = useState('#000000');
  const [editMode, setMode] = useState(true);

  function handleChangeComplete(color) {
    setColor(color.hex);
  }

  useEffect(() => {
    currentColor(color);
  }, [color]);

  return (
    <SketchPicker
      className='sketch'
      color={currentColor}
      disableAlpha={true}
      onChangeComplete={handleChangeComplete}
    />
  );
};

export default ColorPicker;
