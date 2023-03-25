import {StyleSheet, View} from 'react-native';
import React from 'react';
import ItemInforLooby from '../ItemInforLobby';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Text} from '../../../../components';

const CardInforLobby = () => {
  return (
    <View style={styles.container_infor_lobby}>
      <Text>Chi tiết hóa đơn</Text>
      <ItemInforLooby iconName="hoop-house" title="Tên sảnh">
        {/* {booking.lobby.name} */}
        Rose
      </ItemInforLooby>
      <ItemInforLooby iconName="table-furniture" title="Số Lượng bàn">
        {/* {booking.quantityTable} */}
        12
      </ItemInforLooby>
      <ItemInforLooby iconName="calendar" title="Ngày đặt">
        {/* {moment(booking.date).format("DD/MM/YYYY")} - Sáng */}
        12/12/2023
      </ItemInforLooby>
    </View>
  );
};

export default CardInforLobby;

const styles = StyleSheet.create({
  container_infor_lobby: {
    paddingVertical: 18,
  },
});
