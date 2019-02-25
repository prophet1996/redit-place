import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import './App.css';
import firebase from "firebase"
const PIXEL_SIZE = 10;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: [

      ]

    }
    firebase.initializeApp({
      apiKey: 'AIzaSyB0Krqd5-hrc6qaiSHTakENr6bsempLhH0',
      authDomain: 'redit-place.firebase.com',
      projectId: 'redit-place'
    });
    firebase.
      firestore().
      collection("pixels").
      onSnapshot((coll) => {
        this.setState({ pixels: coll.docs.map((doc) => doc.data()) })

      })
  }
  handlePixelClick(e) {
    // this.setState()
    const coordinates = {
      x: Math.floor(e.clientX / PIXEL_SIZE),
      y: Math.floor(e.clientY / PIXEL_SIZE),
    }
    this.setState({ selectedCoordinate: coordinates })
    firebase.
      firestore().
      collection("pixels").
      onSnapshot((coll) => {
        this.setState({ pixels: coll.docs.map((doc) => doc.data()) })

      })

  }
  handlePickedColor(color) {


    firebase.firestore().collection("pixels").add({

      ...this.state.selectedCoordinate, color: color.hex

    })
      .then(function (docRef) {



      })
      .catch(function (error) {

      });
    this.setState({
      pixels: this.state.pixels.concat({
        ...this.state.selectedCoordinate, color: color.hex
      })
    }, () => { this.setState({ selectedCoordinate: null }) })


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
        {this.state.selectedCoordinate && <div style={{
          position: "absolute",
          left: (this.state.selectedCoordinate.x + 1) * PIXEL_SIZE,
          top: (this.state.selectedCoordinate.y + 1) * PIXEL_SIZE,
        }}>
          <CirclePicker onChangeComplete={this.handlePickedColor.bind(this)} />
        </div>
        }
      </div>
    );
  }
}

export default App;
