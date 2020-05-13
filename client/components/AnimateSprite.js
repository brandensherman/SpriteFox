import React, { useState } from 'react';
import Slider from 'react-input-slider';

function AnimateSprite(props) {

  const [FPS, setFPS] = useState(10)


  return (
    <div>
        <h1>{FPS}</h1>
      <div>
        <div>
          <Slider xmax={20} xmin={0}
            axis="x"
            x={FPS}
            onChange={({ x }) => setFPS(x)}
          />
        </div>
      </div>


    </div>
  )
}


export default AnimateSprite
