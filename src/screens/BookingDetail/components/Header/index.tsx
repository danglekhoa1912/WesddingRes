import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {goBack} from '../../../../utils/navigate';
import {useTheme} from '@ui-kitten/components';

const Header = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={40}
          color={theme['color-primary-default']}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Thông tin hóa đơn</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
