import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import {MenuBg} from '../../assets/index';
import {navigate} from '../../utils/navigate';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const logOut = () => {
    navigate('LoginScreen');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#f15453'}}>
        <ImageBackground source={MenuBg} style={styles.background_image}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
            }}
          />
          <Text style={styles.text}>Khoa</Text>
        </ImageBackground>
        <View style={styles.container_list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.container_bottom}>
        <TouchableOpacity onPress={logOut} style={styles.button}>
          <View style={styles.content_button}>
            <Icon name="exit-outline" size={22} />
            <Text style={{fontSize: 15, marginLeft: 5}}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container_list: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  background_image: {
    padding: 20,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold',
  },
  container_bottom: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    paddingVertical: 10,
  },
  content_button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
