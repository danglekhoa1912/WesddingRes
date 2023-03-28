import {StyleSheet, View} from 'react-native';
import React from 'react';
import ItemInforLooby from '../ItemInforLobby';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Text} from '@ui-kitten/components';
import {AppState} from '../../../../store';
import {IBookingStore} from '../../../../store/booking';

const CardInforLobby = () => {
  const pBooking = useSelector<AppState, IBookingStore>(
    state => state.booking,
  ).order;

  return (
    <View style={styles.container_infor_lobby}>
      <Text category="h5">Chi tiết hóa đơn</Text>
      <ItemInforLooby iconName="hoop-house" title="Tên sảnh">
        {/* {booking.lobby.name} */}
        Rose
      </ItemInforLooby>
      <ItemInforLooby iconName="table-furniture" title="Số Lượng bàn">
        {pBooking.quantityTable}
        12
      </ItemInforLooby>
      <ItemInforLooby iconName="calendar" title="Ngày đặt">
        {moment(pBooking.date).format('DD/MM/YYYY')} - Sáng 12/12/2023
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
