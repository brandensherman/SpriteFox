import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Canvas from './Canvas';

function MainPage() {
  const initialState = '#000000';
  const [currentColor, setColor] = useState(initialState);
  const [currentAlpha, setAlpha] = useState(1);

  function handleChangeComplete(color) {
    // console.log('color >>> ', color) // returns obj
    setColor(color.hex);
    // can't set alpha with hex - ignore for now
  }

  useEffect(() => {
    // document.title = currentColor;
  });

  return (
    <div className='container main-container'>
      <SketchPicker
        className='sketch'
        color={currentColor}
        onChangeComplete={handleChangeComplete}
      />
      <div>
        <Canvas color={currentColor} />
      </div>
    </div>
  );
}

export default MainPage;
