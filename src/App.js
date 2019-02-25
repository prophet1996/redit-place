import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import './App.css';
const PIXEL_SIZE = 10;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: [
        { x: 6, y: 8, color: '#99CCFF' },
        { x: 9, y: 18, color: 'red' },
        { x: 6, y: 10, color: 'blue' },
        { x: 15, y: 5, color: 'grey' },
      ]
    }
  }
  handlePixelClick(e) {
    console.log('clicked', e.clientY, e.clientX);
    // this.setState()
    const coordinates = {
      x: Math.floor(e.clientX / PIXEL_SIZE),
      y: Math.floor(e.clientY / PIXEL_SIZE),
      color: this.state.currentColor
    }
  }
  render() {

    return (
      <div className="App">
        <div id="pixels"
          onClick={this.handlePixelClick.bind(this)}
          style={{ position: "relative", height: "100vh", width: "100vw" }}>
          {this.state.pixels.map((pixel) => {
            return (<div
              style={{
                left: pixel.x * PIXEL_SIZE,
                top: pixel.y * PIXEL_SIZE,
                width: PIXEL_SIZE,
                height: PIXEL_SIZE,
                backgroundColor: pixel.color,
                position: "absolute",
              }}
            >

            </div>)
          })}
        </div>
        <div style={{
          position: "absolute",
          top: 100,
          left: 100,
        }}>
          <CirclePicker />
        </div>
      </div>
    );
  }
}

export default App;
