import {StyleSheet} from 'react-native';
import React from 'react';
import {Card} from '../../../../components';
import {Text} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../store';
import {IUser} from '../../../../type/user';

const CardInfor = () => {
  const user = useSelector<AppState, IUser>(state => state.user.user);
  console.log(user);
  return (
    <Card style={styles.container_infor_user}>
      <Text category="h5">Thông tin cá nhân</Text>
      <Text>Tên khách hàng: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Số điện thoại: {user.mobile}</Text>
    </Card>
  );
};

export default CardInfor;

const styles = StyleSheet.create({
  container_infor_user: {
    width: '100%',
    padding: 12,
  },
});
