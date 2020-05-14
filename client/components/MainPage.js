import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import PlayFramesButton from './PlayFramesButton'
import ToggleAnimationEditModes from './ToggleAnimationEditModes'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Canvas from './Canvas';
import AnimateSprite from './AnimateSprite'


function MainPage() {
  const initialState = '#fff';
  const [currentColor, setColor] = useState(initialState);
  const [editMode, setMode] = useState(true)

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
        <div>
          <button onClick={() => setMode(false)} className='btn'>Animate Frames</button>
        </div>

        <div>
          <button onClick={() => setMode(true)} className='btn'>Edit Frames</button>
        </div>
      </div>

      <div>
        {editMode
          ? <Canvas color={currentColor} />
          : <AnimateSprite />
        }
      </div>




    </div>
  );
}

export default MainPage;
