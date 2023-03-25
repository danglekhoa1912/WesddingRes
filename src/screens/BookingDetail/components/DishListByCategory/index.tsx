import {StyleSheet, View} from 'react-native';
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {Text} from '../../../../components';
import {ICategory} from '../../../../type/dish';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

interface IDishListByCategory {
  category: ICategory;
}

const DishListByCategory = ({category}: IDishListByCategory) => {
  const styles = useStyleSheet(themedStyles);
  //   const menu = useSelector(menuSelector);
  //   const dishListByCate = menu.dishList.filter(
  //     (dish) => dish.categoryId.id == category.id
  //   );

  return (
    <Fragment>
      {/* {dishListByCate.length > 0 && (
        <View style={styles.container}>
          <Text  style={styles.title}>
            {category.name}
          </Text>
          {dishListByCate.map((dish) => (
            <View key={dish.id} style={styles.container_dish}>
              <Text style={styles.dish}>*{dish.name}</Text>
              <Text>{dish.price} VND</Text>
            </View>
          ))}
        </View>
      )} */}
    </Fragment>
  );
};

export default DishListByCategory;

const themedStyles = StyleService.create({
  container: {
    padding: 10,
  },
  title: {
    color: 'color-secondary',
  },
  container_dish: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dish: {
    paddingLeft: 12,
  },
});
