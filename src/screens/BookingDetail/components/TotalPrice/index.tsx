import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Divider, Text} from '@ui-kitten/components';

interface ITotalPrice {
  lobbyPrice: number;
  dishPrice: number;
  tableQuantity: number;
  servicePrice: number;
}

const TotalPrice = ({
  dishPrice,
  lobbyPrice,
  servicePrice,
  tableQuantity,
}: ITotalPrice) => {
  //    const booking = useSelector(bookingSelector);
  const totalLobby = (lobbyPrice + dishPrice) * tableQuantity;
  return (
    <View>
      <Text category="h5">Thanh toán</Text>
      <View style={styles.total}>
        <View style={styles.price}>
          <Text category="h6">Tiền sảnh</Text>
          <Text>{lobbyPrice} VND</Text>
        </View>
        <View style={styles.price}>
          <Text></Text>
          <Text>+</Text>
        </View>
        <View style={styles.price}>
          <Text category="h6">Tiền món ăn</Text>
          <Text>{dishPrice} VND</Text>
        </View>
        <View style={styles.price}>
          <Text></Text>
          <Text>x</Text>
        </View>
        <View style={styles.price}>
          <Text category="h6">Số bàn</Text>
          <Text>{tableQuantity} bàn</Text>
        </View>
        <Divider />
        <View style={styles.price}>
          <Text></Text>
          <Text>{totalLobby} VND</Text>
        </View>
        <View style={styles.price}>
          <Text category="h6">Tiền dịch vụ</Text>
          <Text>{servicePrice} VND</Text>
        </View>
        <Divider />
        <View style={styles.price}>
          <Text category="h6">Tổng tiền</Text>
          <Text>{totalLobby + servicePrice} VND</Text>
        </View>
      </View>
    </View>
  );
};

export default TotalPrice;

const styles = StyleSheet.create({
  total: {
    paddingHorizontal: 10,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
