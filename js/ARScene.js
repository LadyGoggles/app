'use strict';

import React, { Component } from 'react';

import {StyleSheet, Linking, TouchableHighlight} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroFlexView,
  ViroBox,
  ViroMaterials
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
        <ViroBox
          position={[0, 0, -2]} 
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
        {/*<ViroFlexView
          style={{flexDirection: 'column', padding: .1}} 
          width={2.0} height={3.5} 
          position={[0, 0, -4]}
          backgroundColor='rgba(0, 0, 0, 0.8)'
          onClick={this._onClick}>
        </ViroFlexView>
                <ViroText 
          text={this.state.headerText} 
          position={[0, -1.85, -3]} 
          style={styles.headerTextStyle} 
          width={1.3} height={2}
          onClick={this._onClick}/>
        <ViroText 
          text={this.state.subheaderText} 
          position={[0, -2.15, -3]} 
          style={styles.subheaderTextStyle} 
          width={1.3} height={2}
          onClick={this._onClick}/>
        <ViroText 
          text={this.state.text} 
          position={[0, -2, -3]} 
          style={styles.textStyle} 
          width={1.3} height={2}
        onClick={this._onClick}/>*/}
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

ViroMaterials.createMaterials({
  susie: {
    diffuseTexture: require('./res/Susie_King_Taylor.jpg'),
  },
  stone: {
    diffuseTexture: require('./res/stone.jpg'),
  },
});

module.exports = ARScene;
