import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const CustomPopup = ({ visible, onClose, onSubmit, children, showCenter }) => {


  useEffect(() => {

  }, []);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={showCenter ? styles.centerOverlay : styles.overlay}>
        <View style={showCenter ? styles.centerPopup : styles.popup}>
          {children}

        </View>
      </View>
    </Modal>
  );
};

// Function to format seconds into MM:SS format
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'center',
    minHeight:120
  },
  centerPopup: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    minHeight:180
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 200,
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 10,
  },
  timer: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomPopup;
