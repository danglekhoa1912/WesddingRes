import {View, Text, Dimensions, Animated, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './toastifyStyles';
import {RFPercentage} from 'react-native-responsive-fontsize';

const Colors = {
  light: {
    text: '#4c4c4c',
    back: '#ffffff',
  },
  dark: {
    text: '#ffffff',
    back: '#4c4c4c',
  },
  default: '#3498db',
  info: '#3498db',
  success: '#07bc0c',
  warn: '#f1c40f',
  error: '#e74c3c',
  textDefault: '#4c4c4c',
  textDark: 'black',
};

type ToastManagerProps = {
  theme: string;
  width: number;
  height: number;
  style: any;
  position: string;
  positionValue: number;
  end: number;
  duration: number;
  animationInTiming: number;
  animationOutTiming: number;
  backdropTransitionInTiming: number;
  backdropTransitionOutTiming: number;
  animationIn: string;
  animationOut: string;
  animationStyle: string;
  hasBackdrop: boolean;
  backdropColor: string;
  backdropOpacity: number;
};

type ToastManagerState = {
  isShow: boolean;
  text: string;
  opacityValue: any;
  barWidth: any;
  duration: number;
  oldDuration: number;
  barColor: string;
  icon: string;
  position: string;
  animationStyle: {
    upInUpOut: {
      animationIn: string;
      animationOut: string;
    };
    rightInOut: {
      animationIn: string;
      animationOut: string;
    };
    zoomInOut: {
      animationIn: string;
      animationOut: string;
    };
  };
};

const defaultProps: ToastManagerProps = {
  theme: 'light',
  width: RFPercentage(32),
  height: RFPercentage(8.5),
  style: {},
  position: 'top',
  positionValue: 50,
  end: 0,
  duration: 3000,
  animationInTiming: 300,
  animationOutTiming: 300,
  backdropTransitionInTiming: 300,
  backdropTransitionOutTiming: 300,
  animationIn: '',
  animationOut: '',
  animationStyle: 'upInUpOut',
  hasBackdrop: false,
  backdropColor: 'black',
  backdropOpacity: 0.2,
};

const {height} = Dimensions.get('window');

class ToastManager extends Component<ToastManagerProps, ToastManagerState> {
  static defaultProps: ToastManagerProps = defaultProps;
  static __singletonRef: any;
  isShow: boolean = false;
  timer: any;
  constructor(props: any) {
    super(props);
    ToastManager.__singletonRef = this;
  }

  state: ToastManagerState = {
    isShow: false,
    text: '',
    duration: 300,
    oldDuration: 0,
    opacityValue: new Animated.Value(1),
    barWidth: new Animated.Value(RFPercentage(32)),
    barColor: Colors.default,
    icon: 'check-circle',
    position: this.props.position,
    animationStyle: {
      upInUpOut: {
        animationIn: 'slideInDown',
        animationOut: 'slideOutUp',
      },
      rightInOut: {
        animationIn: 'slideInRight',
        animationOut: 'slideOutRight',
      },
      zoomInOut: {
        animationIn: 'zoomInDown',
        animationOut: 'zoomOutUp',
      },
    },
  };

  static info = (text: string, position: string) => {
    ToastManager.__singletonRef.show(
      text,
      Colors.info,
      'info-circle',
      position,
    );
  };

  static success = (text: string, position: string) => {
    ToastManager.__singletonRef.show(
      text,
      Colors.success,
      'check-circle',
      position,
    );
  };

  static warn = (text: string, position: string) => {
    ToastManager.__singletonRef.show(text, Colors.warn, 'warning', position);
  };

  static error = (text: string, position: string) => {
    ToastManager.__singletonRef.show(
      text,
      Colors.error,
      'exclamation-circle',
      position,
    );
  };

  show = (
    text = '',
    barColor = Colors.default,
    icon: string,
    position: string,
  ) => {
    const {duration} = this.props;
    this.state.barWidth.setValue(this.props.width);
    this.setState({
      isShow: true,
      duration,
      text,
      barColor,
      icon,
    });
    if (position) this.setState({position});
    this.isShow = true;
    if (duration !== this.props.end) this.close(duration);
  };

  close = (duration: number) => {
    if (!this.isShow && !this.state.isShow) return;

    this.resetAll();
    this.timer = setTimeout(() => {
      this.setState({isShow: false});
    }, duration || this.state.duration);
  };

  position = () => {
    const {position} = this.state;
    if (position === 'top') return this.props.positionValue;

    if (position === 'center') return height / 2 - RFPercentage(9);

    return height - this.props.positionValue - RFPercentage(10);
  };

  handleBar = () => {
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
  };

  pause = () => {
    this.setState({oldDuration: this.state.duration, duration: 10000});
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: false,
    }).stop();
  };

  resume = () => {
    this.setState({duration: this.state.oldDuration, oldDuration: 0});
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
  };

  hideToast = () => {
    this.resetAll();
    this.setState({isShow: false});
    this.isShow = false;
    if (!this.isShow && !this.state.isShow) return;
  };

  resetAll = () => {
    clearTimeout(this.timer);
  };

  render() {
    this.handleBar();
    const {
      animationIn,
      animationStyle,
      animationOut,
      backdropColor,
      backdropOpacity,
      backdropTransitionInTiming,
      backdropTransitionOutTiming,
      animationInTiming,
      animationOutTiming,
      hasBackdrop,
      height,
      style,
      theme,
      width,
    } = this.props;

    const {
      animationStyle: stateAnimationStyle,
      barColor,
      barWidth,
      icon,
      isShow,
      text,
    } = this.state;
    return (
      <Modal
        animationIn={
          animationIn || stateAnimationStyle[animationStyle].animationIn
        }
        animationOut={
          animationOut || stateAnimationStyle[animationStyle].animationOut
        }
        backdropTransitionInTiming={backdropTransitionInTiming}
        backdropTransitionOutTiming={backdropTransitionOutTiming}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        onTouchEnd={this.resume}
        onTouchStart={this.pause}
        swipeDirection={['up', 'down', 'left', 'right']}
        onSwipeComplete={this.hideToast}
        onModalHide={this.resetAll}
        isVisible={isShow}
        coverScreen={false}
        backdropColor={backdropColor}
        backdropOpacity={backdropOpacity}
        style={styles.modalContainer}>
        <View
          style={[
            styles.mainContainer,
            {
              width,
              height,
              backgroundColor: Colors[theme].back,
              top: this.position,
              ...style,
            },
          ]}>
          <TouchableOpacity
            onPress={this.hideToast}
            activeOpacity={0.9}
            style={styles.hideButton}>
            <Icon name="close" size={22} color={Colors[theme].text} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Icon
              name={icon}
              size={22}
              color={barColor}
              style={styles.iconWrapper}
            />
            <Text style={[styles.textStyle, {color: Colors[theme].text}]}>
              {text}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{width: barWidth, backgroundColor: barColor}}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export const Toast = {
  info: ToastManager.info,
  success: ToastManager.success,
  warn: ToastManager.warn,
  error: ToastManager.error,
};

export default ToastManager;
