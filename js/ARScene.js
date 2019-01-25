'use strict';

import React, { Component } from 'react';

import {StyleSheet, Linking} from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroButton
} from 'react-viro';

import { xStatue, yStatue, zStatue, xButton, yButton, zButton } from '../assets/ARConstants';
export default class ARScene extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      headerText : "Initializing AR...",
      subheaderText: "",
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroBox
          position={[xStatue, yStatue, zStatue]} 
          height={.815}
          length={.5}
          width={.5}
          materials={["susie"]} 
          onClick={this._onClick}/>
        <ViroBox
          position={[0, -.66, -2]} 
          scale={[.5, .5, .5]}
          materials={["stone"]} 
          onClick={this._onClick}/>
          <ViroButton 
          source={require('../assets/close_ar.png')}
          position={[xButton, yButton, zButton]}
          height={.1}
          width={.1}
          onClick={this.props.exitViro}
          
          dragType="FixedToWorld"
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        headerText : "Susie King Taylor",
        subheaderText: "(1848-1912)",
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
    fontSize: 10,
    color: 'black',
    textAlign: 'center',  
  },
  subheaderTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  susie: {
    diffuseTexture: require('./res/Susie_King_Taylor.jpg'),
  },
  stone: {
    diffuseTexture: require('./res/stone.jpg'),
  },
});

module.exports = ARScene;
