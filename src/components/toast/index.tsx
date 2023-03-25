import {View, Text, Animated} from 'react-native';
import React, {ReactNode, useEffect, useRef} from 'react';

interface IMessage {
  style: any;
  onHide: () => void;
  children: ReactNode;
}

const Message = ({children, onHide, style}: IMessage) => {
  const opacity = useRef<any>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -20],
              }),
            },
          ],
          marginVertical: 10,
          marginHorizontal: 40,
          marginBottom: 5,
          backgroundColor: 'white',
          padding: 0,
          shadowColor: 'black',
          shadowOffset: {
            height: 3,
            width: 0,
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 6,
          borderWidth: 1,
          borderColor: '#707070',
          borderStyle: 'solid',
          borderRadius: 10,
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

export default Message;
