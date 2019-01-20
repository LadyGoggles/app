import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, StyleSheet } from 'react-native';
const pinkFlag = require('./assets/flag-pink.png');
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      markers: [
        {key: 1, coordinate: { latitude: 40.6739, longitude: -73.9701 }, color: '#4bb3cb'},
        {key: 2, coordinate: { latitude: 40.6739, longitude: -73.9901 }, color: '#4bb3cb'}
      ]
    }
    // this.onMapPress = this.onMapPress.bind(this);
  }

    // onMapPress(e) {
  //   this.setState({
  //     markers: [
  //       ...this.state.markers,
  //       {
  //         coordinate: e.nativeEvent.coordinate,
  //         key: id++,
  //         color: randomColor(),
  //       },
  //     ],
  //   });
  // }

  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.6739,
          longitude: -73.9701,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
      { this.state.markers.map(marker => (
        <Marker
          key={marker.key}
          coordinate={marker.coordinate}
          pinColor={marker.color}
        />
      ))}
    </MapView>
    )
  }
}

const styles = {
  map: {
    ...StyleSheet.absoluteFillObject,
  }
}
