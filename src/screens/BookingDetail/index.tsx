import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {
  CardInfor,
  CardInforLobby,
  DishListByCategory,
  Header,
  TotalPrice,
} from './components';
import {Button} from '../../components';

const BookingDetailPage = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <CardInfor />
      <CardInforLobby />
      <View style={styles.dish_list}>
        <Text>Danh sách món ăn</Text>
        {/* {category.listCategory.map((item) => (
               <DishListByCategory key={item.id} category={item} />
            ))} */}
      </View>
      <View style={styles.service_list}>
        <Text>Danh sách dịch vụ</Text>
      </View>
      {/* <TotalPrice  /> */}
      <View>
        <Text>Phương thức thanh toán</Text>
        {/* {Object.keys(type_pay).map((type) => (
               <TypePayment
                  isChoose={booking.type_pay == type_pay[type].type}
                  key={type_pay[type].id}
                  typePayment={type_pay[type]}
               />
            ))} */}
      </View>
      <Button
        title="Thanh Toan"
        backgroundColor={theme['color-primary-default']}
        style={styles.button}
        styleText={styles.button_text}
      />
    </ScrollView>
  );
};

export default BookingDetailPage;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-background',
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  dish_list: {},
  service_list: {},
  button: {
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 20,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
