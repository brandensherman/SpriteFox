import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket.js';
import Slider from 'react-input-slider';
import ColorPicker from './ColorPicker';
import Instructions from './Instructions.js';

import { createGrid } from '../utils/createGrid';

let canvas, ctx;

const Canvas = (props) => {
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

    socket.on('fill', (x, y, color, pixelSize, factor) => {
      fillPixel(x, y, color, pixelSize, factor);
    });
  }, []);

  // --------- RENDER SAVED GRID --------- //
  function renderSaved(savedGrid) {
    let pixelSize = 8;

    ctx.clearRect(0, 0, 16 * 24, 16 * 24);
    for (let key in savedGrid) {
      // key = id = index of row array
      let pixelRow = savedGrid[key];
      for (let i = 0; i < pixelRow.length; i++) {
        if (pixelRow[i] !== null) {
          // These are the actual coordinates to render on the grid
          let coordinateX = i * pixelSize;
          let coordinateY = key * pixelSize;

          // Render each original pixel from the saved grid
          ctx.fillStyle = pixelRow[i];
          ctx.fillRect(coordinateX, coordinateY, pixelSize, pixelSize);
        }
      }
    }
  }

  // --------- GET FRAMES--------- //
  function getFrames() {
    for (let key in localStorage) {
      if (key !== 'currentColor' && typeof localStorage[key] === 'string') {
        setFramesArray([...framesArray, key]);
      }
    }
  }

  // --------- ANIMATE FRAMES --------- //
  function animate() {
    let len = framesArray.length;
    let interval = 0;
    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        getCanvas(framesArray[i]);
      }, interval);

      interval = interval + 1000 / fps;
    }
  }

  // --------- DELETE FRAMES --------- //
  function deleteFrame(canvasName) {
    const filteredArray = framesArray.filter((frame) => frame !== canvasName);
    localStorage.removeItem(canvasName);

    setFramesArray(filteredArray);
  }

  // --------- CREATE A NEW FRAME --------- //
  function newFrame() {
    ctx.clearRect(0, 0, 16 * 24, 16 * 24);
    createGrid(ctx, pixelSize, mappedGrid);

    if (framesArray) {
      localStorage.setItem(`${frameCounter}`, JSON.stringify(mappedGrid));
    }

    setFrameCounter(frameCounter + 1);

    setFramesArray([...framesArray, frameCounter]);
    setCurrentFrame(frameCounter);
  }

  // --------- DUPLICATE CURRENT FRAME --------- //
  // saves canvas, adds it to array of canvases
  function duplicateFrame() {
    if (framesArray) {
      localStorage.setItem(`${frameCounter}`, JSON.stringify(mappedGrid));
    }

    setFrameCounter(frameCounter + 1);

    ctx.clearRect(0, 0, 16 * 24, 16 * 24);
    createGrid(ctx, pixelSize, mappedGrid);

    setFramesArray([...framesArray, frameCounter]);
    setCurrentFrame(frameCounter);
    setTimeout(() => getCanvas(currentFrame), 500);
  }

  // --------- NEW SESSION--------- //
  function newSession() {
    // Clears Storage, clears display of frames underneath grid, resets canvas
    resetCanvas();
    localStorage.clear();

    setFrameCounter(1);
    setFramesArray([]);

    setTimeout(() => {
      if (framesArray) {
        localStorage.setItem(`${frameCounter}`, JSON.stringify(mappedGrid));
      }

      setFrameCounter(frameCounter + 1);
      setFramesArray([...framesArray, frameCounter]);
      setCurrentFrame(frameCounter);
    }, 1000);
  }

  // --------- GET CANVAS--------- //
  function getCanvas(frameNumber) {
    ctx.clearRect(0, 0, 16 * 24, 16 * 24);
    let grid = JSON.parse(localStorage.getItem(frameNumber));
    renderSaved(grid); // grid is obj of arrays
    setCurrentFrame(frameNumber);
    setMappedGrid(grid);
  }

  // --------- RESET CANVAS --------- //
  function resetCanvas() {
    ctx.clearRect(0, 0, 16 * 24, 16 * 24);
    createGrid(ctx, pixelSize, mappedGrid);
    localStorage.setItem(`${currentFrame}`, JSON.stringify(mappedGrid));
  }

  // --------- DELETE PIXEL --------- //
  function deletePixel(defaultX, defaultY) {
    const canvasRect = canvas.getBoundingClientRect();
    // These are not the actual coordinates but correspond to the place on the grid
    let x =
      defaultX ?? Math.floor((window.event.clientX - canvasRect.x) / pixelSize);
    let y =
      defaultY ?? Math.floor((window.event.clientY - canvasRect.y) / pixelSize);
    if (defaultX === undefined && defaultY === undefined) {
      socket.emit('delete', x, y);
    }
    // MAP color to proper place on mappedGrid
    for (let i = 0; i < factor; i++) {
      for (let j = 0; j < factor; j++) {
        mappedGrid[y * factor + i][x * factor + j] = null;
      }
    }
    // These are the actual coordinates to properly place the pixel
    let actualCoordinatesX = x * pixelSize;
    let actualCoordinatesY = y * pixelSize;
    ctx.clearRect(actualCoordinatesX, actualCoordinatesY, pixelSize, pixelSize);

    localStorage.setItem(`${currentFrame}`, JSON.stringify(mappedGrid));
  }

  // --------- FILL PIXEL --------- //
  function fillPixel(defaultX, defaultY) {
    const canvasRect = canvas.getBoundingClientRect();

    // These are not the actual coordinates but correspond to the place on the grid
    let x =
      defaultX ?? Math.floor((window.event.clientX - canvasRect.x) / pixelSize);
    let y =
      defaultY ?? Math.floor((window.event.clientY - canvasRect.y) / pixelSize);

    // MAP color to proper place on mappedGrid
    for (let i = 0; i < factor; i++) {
      for (let j = 0; j < factor; j++) {
        mappedGrid[y * factor + i][x * factor + j] = color;
      }
    }
    if (defaultX === undefined && defaultY === undefined) {
      socket.emit('fill', x, y, color, pixelSize, factor);
    }

    // These are the actual coordinates to properly place the pixel
    let actualCoordinatesX = x * pixelSize;
    let actualCoordinatesY = y * pixelSize;

    ctx.fillStyle = color;

    ctx.fillRect(actualCoordinatesX, actualCoordinatesY, pixelSize, pixelSize);

    localStorage.setItem(`${currentFrame}`, JSON.stringify(mappedGrid));
  }

  // --------- HANDLE FILL/DELETE--------- //
  function handleMouseDown() {
    if (tool) {
      fillPixel();
    } else {
      deletePixel();
    }
  }

  // --------- CONTINUOUS FILL PIXEL --------- //
  function continuousFill() {
    canvas.addEventListener('mousemove', handleMouseDown, true);
    window.addEventListener('mouseup', (secondEvent) => {
      canvas.removeEventListener('mousemove', handleMouseDown, true);
    });
  }

  //--------- SET PIXEL SIZE --------- //
  function selectPixelSize(event) {
    let factor;
    let pixels = parseInt(event.target.value);
    if (pixels === 24) {
      factor = 3;
    } else if (pixels === 16) {
      factor = 2;
    } else if (pixels === 8) {
      factor = 1;
    }
    // socket.emit('selectPixelSize', pixels, factor);

    setPixelSize(pixels);
    setPixelSelect(factor);
    setFactor(factor);
  }

  socket.emit('joinroom', props.match.params.hash);

  return (
    <div>
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
              onClick={() => handleMouseDown()}
              onMouseDown={() => continuousFill()}
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
          <div className='frames-header'>
            <div className='frames-heading'>
              <h3>CHOOSE FRAME</h3>
              <button onClick={() => newFrame()} className='btn add-btn'>
                +
              </button>
            </div>
            <hr />
          </div>
          <div className='frames-container'>
            <ul>
              {framesArray.map((frame, index) => {
                return (
                  <li key={index} className='frame-item'>
                    <button
                      className='frame-name frame-btn'
                      onClick={() => getCanvas(frame)}
                    >
                      Frame {frame}
                    </button>
                    <button
                      className='frame-btn frame-btn-delete'
                      onClick={() => deleteFrame(frame)}
                    >
                      DELETE
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CANVAS BUTTONS */}
        <div className='canvas-buttons'>
          <button onClick={resetCanvas} className='btn'>
            Reset Canvas
          </button>

          <button onClick={() => newFrame()} className='btn'>
            New Frame
          </button>

          <button onClick={() => duplicateFrame(currentFrame)} className='btn'>
            Duplicate Frame
          </button>

          <button onClick={() => animate()} className='btn animate-btn'>
            Animate!
          </button>

          <button onClick={newSession} className='btn session-btn'>
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
                onChange={({ x }) => setFps(x)}
                className='slider-bar'
              />
            </div>
          </div>
          <div className='pixel-buttons tools'>
            <button
              onClick={selectPixelSize}
              className={`btn ${
                pixelSelect === 1 ? 'pixel-btn pixel-btn-active' : 'pixel-btn'
              }`}
              value={8}
            >
              8px
            </button>
            <button
              onClick={selectPixelSize}
              className={`btn ${
                pixelSelect === 2 ? 'pixel-btn pixel-btn-active' : 'pixel-btn'
              }`}
              value={16}
            >
              16px
            </button>
            <button
              onClick={selectPixelSize}
              className={`btn ${
                pixelSelect === 3 ? 'pixel-btn pixel-btn-active' : 'pixel-btn'
              }`}
              value={24}
            >
              24px
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
