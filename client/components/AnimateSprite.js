import React, { useState } from 'react';
import Slider from 'react-input-slider';
import PlayFramesButton from './PlayFramesButton';

function AnimateSprite(props) {

  const [FPS, setFPS] = useState(10)



  return (
    <div className="animation-container ">
      <div className="frame">
        <img src="grumpyWizardFox.jpg" />
      </div>

      <div className='slider-container'>
        <h3 className="uk-margin-small-right uk-margin-remove-bottom">{FPS} FPS</h3>
        <div>
          <Slider xmax={25} xmin={0}
            axis="x"
            x={FPS}
            onChange={({ x }) => setFPS(x)}
          />
        </div>
        <PlayFramesButton />
      </div>


    </div>
  )
}


export default AnimateSprite
