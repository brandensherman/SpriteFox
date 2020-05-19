import React, { useState } from 'react';
import Slider from 'react-input-slider';
import PlayFramesButton from './PlayFramesButton';

function AnimateSprite(props) {
  const [FPS, setFPS] = useState(10);

  return (
    <div className='container animate-sprite-container'>
      <div className='slider-container'>
        <h3 className='slider-header'>{FPS} FPS</h3>
        <div>
          <Slider
            xmax={25}
            xmin={0}
            axis='x'
            x={FPS}
            onChange={({ x }) => setFPS(x)}
            className='slider-bar'
          />
        </div>
        <PlayFramesButton />
      </div>
    </div>
  );
}

export default AnimateSprite;
