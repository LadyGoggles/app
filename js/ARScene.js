'use strict';

import React, { Component } from 'react';

import {StyleSheet, Linking, TouchableHighlight} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroFlexView
} from 'react-viro';

export default class ARScene extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      headerText : "Initializing AR...",
      subheaderText: "",
      text: ""
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroFlexView
          style={{flexDirection: 'column', padding: .1}} 
          width={2.0} height={3.5} 
          position={[0, 0, -4]}
          backgroundColor='rgba(0, 0, 0, 0.8)'
          onClick={this._onClick}>
        </ViroFlexView>
        <ViroText 
          text={this.state.headerText} 
          position={[0, .2, -3]} 
          style={styles.headerTextStyle} 
          width={1.3} height={2}
          onClick={this._onClick}/>
        <ViroText 
          text={this.state.subheaderText} 
          position={[0, -0.08, -3]} 
          style={styles.subheaderTextStyle} 
          width={1.3} height={2}
          onClick={this._onClick}/>
        <ViroText 
          text={this.state.text} 
          position={[0, -2, -3]} 
          style={styles.textStyle} 
          width={1.3} height={2}
          onClick={this._onClick}/>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        headerText : "Susie Taylor",
        subheaderText: "(1848-1912)\nSusie Taylor was the first African American Nurse in the US Army, the first African American person to teach openly in schools, and the author of 'Reminiscences of My Life in Camp with the 33d United States Colored Troops, Late 1st S.C. Volunteers,' the only published memoir of wartime experiences by an African American Woman.",
        text: "Tap for more info."
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onClick(){
    Linking.openURL("https://en.wikipedia.org/wiki/Susie_Taylor").catch(err => console.error('An error occurred', err));
  }
}

var styles = StyleSheet.create({
  headerTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',  
  },
  subheaderTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'center',  
  },
  textStyle: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',  
  },
  touchable: {
    height: 3,
    width: 2
  }
});

module.exports = ARScene;
