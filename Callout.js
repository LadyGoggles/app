import React, { Component } from 'react';
import {
  Image,              
  StyleSheet,         
  Text,               
  View,               
} from 'react-native';

export default class MyCallout extends Component {
  render() {
    const { name, image } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <View>
            {/*<Image
              style={styles.image}
              source={require('./89px-Susie-King-Taylor.jpg')}
            />*/}
            <Text style={styles.content}>Susie King Taylor (August 6, 1848 – October 6, 1912) was the first Black Army nurse.</Text>
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 5
  }
  // Character image
  image: {
    width: 120,
    height: 80,
  },
});