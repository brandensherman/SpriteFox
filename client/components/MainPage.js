import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import AnimateSprite from './AnimateSprite'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Canvas from './Canvas';

function MainPage() {
  const initialState = '#fff';
  const [currentColor, setColor] = useState(initialState);

  function handleChangeComplete(color) {
    setColor(color.hex);
  }

  useEffect(() => {
    document.title = currentColor;
  });

  return (
    <div>
      <SketchPicker
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
      <div>
        <Canvas color={currentColor} />
        <div>
          <AnimateSprite />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
