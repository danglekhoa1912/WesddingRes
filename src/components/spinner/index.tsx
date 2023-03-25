import {View, Text} from 'react-native';
import React from 'react';
import Layout from 'constants/Layout';
import Lottie from 'lottie-react-native';

const Spinner = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: Layout.window.width,
        height: Layout.window.height,
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>
      <Lottie autoPlay loop source={require('./loading.json')} />
    </View>
  );
};

export default Spinner;
