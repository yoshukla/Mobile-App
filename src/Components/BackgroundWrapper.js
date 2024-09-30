// BackgroundWrapper.js
import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BackgroundWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/images/medilog/background_img.png')} // Replace with your image path
      style={styles.background}
      resizeMode="cover" // Adjust based on your preference (cover, contain, etc.)
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Optional: add a semi-transparent overlay
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // White overlay with 50% opacity
  },
});

export default BackgroundWrapper;
