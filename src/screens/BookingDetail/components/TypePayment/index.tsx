import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card, Text} from '../../../../components';
import {useDispatch} from 'react-redux';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {ITypePay} from '../../../../type/booking';

interface ITypePayment {
  typePayment: ITypePay;
  selected: boolean;
}

const TypePayment = ({selected, typePayment}: ITypePayment) => {
  const dispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);

  const onPress = () => {
    //   dispatch(updateTypePay(typePayment.type));
  };

  return (
    <Card style={[styles.container, selected && styles.choose]}>
      <TouchableOpacity onPress={onPress} style={styles.type_payment}>
        {typePayment.icon}
        <Text style={styles.text}>{typePayment.name}</Text>
      </TouchableOpacity>
    </Card>
  );
};

export default TypePayment;

const themedStyles = StyleService.create({
  container: {width: '100%', marginVertical: 5},
  choose: {
    borderWidth: 2,
    borderColor: 'color-primary-default',
  },
  type_payment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  text: {
    marginLeft: 18,
  },
});
