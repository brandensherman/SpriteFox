import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Canvas from './Canvas';
import AnimateSprite from './AnimateSprite';

function MainPage() {
  const initialState = '#000000';
  const [currentColor, setColor] = useState(initialState);
  const [editMode, setMode] = useState(true);

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
      <div className='left-container'>
        <SketchPicker
          disableAlpha={true}
          className='sketch'
          color={currentColor}
          onChangeComplete={handleChangeComplete}
        />


      </div>
        <div>
          <Canvas color={currentColor} />
        </div>
    </div>
  );
}

export default MainPage;
