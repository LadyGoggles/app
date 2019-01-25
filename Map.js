import React, { Component } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import MyCallout from './Callout.js'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const AR_NAVIGATOR_TYPE = "AR";

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class Map extends Component {
  constructor() {
    super()
    this.state = {
      markers: [
        {key: 1, coordinate: { latitude: 40.6739, longitude: -73.9701 }, color: '#4bb3cb'},
        {key: 2, coordinate: { latitude: 40.6739, longitude: -73.9901 }, color: '#4bb3cb'}
      ],
      inRange: true
    }
    // this.onMapPress = this.onMapPress.bind(this);
    this.success = this.success.bind(this);
  }

  componentDidMount() {

    /*we will want to change this to navigator.geolocation.watchPosition(this.success) in the future to subscribe to 
    changes in location as the user moves. we would then need to pair that with navigator.geolocation.stopObserving()
    in a componentDidUnmount hook*/
    navigator.geolocation.getCurrentPosition(
      this.success, 
      (error) => alert(error.message),
      {enableHighAccuracy: true});
  }

  success(pos) {
    let crd = pos.coords;
    //roughly placing us within the bounds of Grand Army Plaza
    let gap = crd.latitude <= 40.675455 && crd.latitude >= 40.672345 && crd.longitude <= -73.968147 && crd.longitude >= -73.972053
    //a much bigger area that probably covers much of New York
    let test = crd.latitude <= 41 && crd.latitude >= 40 && crd.longitude <= -72 && crd.longitude >= -74

    if (gap) {
      this.setState({inRange: false})
    }
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
      <View style={styles.container}>
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
            // onPress={this.props.getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
          >
            <Callout styles={styles.callout}>
              {/*<MyCallout/>
              *<Image source={{uri: 'https://en.wikipedia.org/wiki/Susie_Taylor#/media/File:Susie_King_Taylor.jpg' }}/>
              <Text>Susie King Taylor</Text>*/}
              <View>
            {/*<Image
              style={styles.image}
              source={require('./89px-Susie-King-Taylor.jpg')}
            />*/}
                <Text>Susie King Taylor (August 6, 1848 – October 6, 1912) was the first Black Army nurse.</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableHighlight 
              onPress={this.props.getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
              disabled={this.state.inRange}
              // underlayColor={'#68a0ff'} 
              >
              <Image
                style={this.state.inRange ? styles.inactiveButtons : styles.buttons}
                source={require('./ARbtn.png')}>
              </Image>
      </TouchableHighlight>
    </View>
    )
  }
}

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
    buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 12
  },
  buttons : {
    height: 50,
    width: 50,
  },
  inactiveButtons : {
    height: 50,
    width: 50,
    opacity: 0.5
  },
  callout: {
    width: 145,
    height: 80
  }
}


