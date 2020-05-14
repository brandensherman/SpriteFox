import React from 'react';

function ToggleAnimationEditModes(props) {

  const [editMode, setMode] = useState(true)

  return (
    <div>
      <div>
        <button onClick={() => setMode(false)} className='btn'>Animate Frames</button>
      </div>

      <div>
        <button  onClick={() => setMode(true)} className='btn'>Edit Frames</button>
      </div>
    </div>
  )
}


export default ToggleAnimationEditModes
