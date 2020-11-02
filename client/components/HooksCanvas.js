import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket.js';
import Slider from 'react-input-slider';
import ColorPicker from './ColorPicker';
import Instructions from './Instructions.js';

import { createGrid } from '../utils/createGrid';

let canvas, ctx;

const HooksCanvas = () => {
  const [pixelSize, setPixelSize] = useState(24);
  const [pixelSelect, setPixelSelect] = useState(3);
  const [factor, setFactor] = useState(3);
  const [framesArray, setFramesArray] = useState([]);
  const [mappedGrid, setMappedGrid] = useState({});
  const [frameCounter, setFrameCounter] = useState(1);
  const [currentFrame, setCurrentFrame] = useState('');
  const [fps, setFps] = useState(5);
  const [color, setColor] = useState('');
  const [tool, setTool] = useState(true);

  const canvasRef = useRef();

  useEffect(() => {
    canvas = canvasRef.current;
    getFrames();
    ctx = canvas.getContext('2d');

    createGrid(ctx, pixelSize, mappedGrid);
  }, []);

  // --------- GET FRAMES--------- //
  function getFrames() {
    for (let key in localStorage) {
      if (key !== 'currentColor' && typeof localStorage[key] === 'string') {
        setFramesArray([...framesArray, key]);
      }
    }
  }

  return (
    <div>
      {/* Instructions */}
      <Instructions />

      <div className='main-container container'>
        {/* Toolbox */}
        <div className='toolbox-container'>
          <ColorPicker currentColor={setColor} />
          <div className='tools'>
            <button
              onClick={() => setTool(!tool)}
              className={`btn ${
                tool ? 'tool-btn tool-btn-active' : 'tool-btn'
              }`}
            >
              Draw
            </button>
            <button
              onClick={() => setTool(!tool)}
              className={`btn ${
                tool ? 'tool-btn' : 'tool-btn tool-btn-active'
              }`}
            >
              Erase
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className='canvas-container'>
          <h3>FRAME {currentFrame}</h3>

          <div className='canvas'>
            <canvas
              className='real-canvas'
              width={16 * 24}
              height={16 * 24}
              ref={canvasRef}
              // onClick={() => this.handleMouseDown()}
              // onMouseDown={() => this.dragPixel()}
            />
            <img
              className='checkered-background'
              src='checkeredBackground.png'
              width={16 * 24}
              height={16 * 24}
            />
            <canvas width={16 * 24} height={16 * 24} />
          </div>
          {/* Frames */}
          {/* <div className='frames-header'>
            <div className='frames-heading'>
              <h3>CHOOSE FRAME</h3>
              <button
                onClick={() => this.addBlankFrame()}
                className='btn add-btn'
              >
                +
              </button>
            </div>
            <hr />
          </div> */}
          {/* <div className='frames-container'>
            <ul>
              {this.state.framesArray.map((frame, index) => {
                return (
                  <li key={index} className='frame-item'>
                    <button
                      className='frame-name frame-btn'
                      onClick={() => this.getCanvas(frame)}
                    >
                      Frame {frame}
                    </button>
                    <button
                      className='frame-btn frame-btn-delete'
                      onClick={() => this.deleteFrame(frame)}
                    >
                      DELETE
                    </button>
                  </li>
                );
              })}
            </ul>
          </div> */}
        </div>
        {/* <div className='buttons-container'>
          <button onClick={this.resetCanvas} className='btn'>
            Reset Canvas
          </button>

          <button onClick={() => this.addFrame(currentFrame)} className='btn'>
            Duplicate Frame
          </button>

          <button onClick={() => this.animate()} className='btn animate-btn'>
            Animate!
          </button>

          <button onClick={this.newSession} className='btn session-btn'>
            New Session
          </button>

          <div className='slider-container'>
            <h3 className='slider-header'>{fps} FPS</h3>
            <div>
              <Slider
                xmax={10}
                xmin={1}
                axis='x'
                x={fps}
                onChange={({ x }) =>
                  this.setState({
                    fps: x,
                  })
                }
                className='slider-bar'
              />
            </div>
          </div>
          <div className='pixel-buttons tools'>
            <button
              onClick={this.setPixelSize}
              className={`btn ${
                pixelSelect === 1 ? 'pixel-btn pixel-btn-active' : 'pixel-btn'
              }`}
              value={8}
            >
              8px
            </button>
            <button
              onClick={this.setPixelSize}
              className={`btn ${
                pixelSelect === 2 ? 'pixel-btn pixel-btn-active' : 'pixel-btn'
              }`}
              value={16}
            >
              16px
            </button>
            <button
              onClick={this.setPixelSize}
              className={`btn ${
                pixelSelect === 3 ? 'pixel-btn pixel-btn-active' : 'pixel-btn'
              }`}
              value={24}
            >
              24px
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HooksCanvas;
