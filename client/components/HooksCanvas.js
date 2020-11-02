import React, { useState, useEffect } from 'react';
import socket from '../socket.js';
import Slider from 'react-input-slider';
import ColorPicker from './ColorPicker';
import Instructions from './Instructions.js';

const HooksCanvas = () => {
  return (
    <div>
      {/* Instructions */}

      <Instructions />

      {/* <div className='main-container container'>
        <div className='toolbox-container'>
          <ColorPicker currentColor={this.setColor} />
          <div className='tools'>
            <button
              onClick={this.toggleTool}
              className={`btn ${
                setTool ? 'tool-btn tool-btn-active' : 'tool-btn'
              }`}
            >
              Draw
            </button>
            <button
              onClick={this.toggleTool}
              className={`btn ${
                setTool ? 'tool-btn' : 'tool-btn tool-btn-active'
              }`}
            >
              Erase
            </button>
          </div>
        </div>
        <div className='canvas-container'>
          <h3>FRAME {currentFrame}</h3>

          <div className='canvas'>
            <canvas
              className='real-canvas'
              width={16 * 24}
              height={16 * 24}
              ref={this.canvas}
              onClick={() => this.handleMouseDown()}
              onMouseDown={() => this.dragPixel()}
            />
            <img
              className='checkered-background'
              src='checkeredBackground.png'
              width={16 * 24}
              height={16 * 24}
            />
            <canvas width={16 * 24} height={16 * 24} />
          </div>

          <div className='frames-header'>
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
          </div>
          <div className='frames-container'>
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
          </div>
        </div>
        <div className='buttons-container'>
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
        </div>
      </div> */}
    </div>
  );
};

export default HooksCanvas;
