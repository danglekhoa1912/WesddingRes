import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Input,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {ScrollView} from 'react-native';
import {Button, Header} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DishItem, CategoryItem} from './components';
import {useTranslation} from 'react-i18next';
import {IDish} from '../../type/dish';
import {AppDispatch, AppState} from '../../store';
import {addDishToMenu} from '../../store/booking';
import {connect} from 'react-redux';
import {sCountDishInMenu} from '../../store/booking/selector';
import {navigate} from '../../utils/navigate';

interface IDishPage {
  pCountDishInMenu: number;
  pAddDishToMenu: (dish: IDish) => void;
}

const CATEGORY_LIST = [
  {
    id: 1,
    title: 'Khai Vi',
  },
  {
    id: 2,
    title: 'Mon Chinh',
  },
  {
    id: 3,
    title: 'Trang Mieng',
  },
  {
    id: 4,
    title: 'Thuc Uong',
  },
];

const DISH_LIST: IDish[] = [
  {
    id: 1,
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 1,
      name: 'Khai vi',
    },
    name: 'Com Chien',
  },
  {
    id: 2,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 1,
      name: 'Khai vi',
    },
  },
  {
    id: 3,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 1,
      name: 'Khai vi',
    },
  },
  {
    id: 4,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 1,
      name: 'Khai vi',
    },
  },
  {
    id: 5,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 2,
      name: 'Trang Mieng',
    },
  },
  {
    id: 6,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 2,
      name: 'Trang Mieng',
    },
  },
  {
    id: 7,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 2,
      name: 'Trang Mieng',
    },
  },
  {
    id: 8,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 2,
      name: 'Trang Mieng',
    },
  },
  {
    id: 9,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 2,
      name: 'Trang Mieng',
    },
  },
  {
    id: 10,
    name: 'Com Chien',
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
    price: 1000,
    categoryId: {
      id: 2,
      name: 'Trang Mieng',
    },
  },
];

const DishPage = ({pCountDishInMenu, pAddDishToMenu}: IDishPage) => {
  const {t} = useTranslation();
  const styles = useStyleSheet(themedStyles);
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const [categorySelected, setCategorySelected] = useState(1);

  return (
    <View style={styles.container}>
      <Header
        placeholderSearch={t('screen.dish.placeholder_search') || ''}
        search={search}
        setSearch={setSearch}
        title={t('screen.dish.title')}
      />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container_category}>
          {CATEGORY_LIST.map(category => (
            <CategoryItem
              selected={categorySelected === category.id}
              key={category.id}
              title={category.title}
              onPress={() => setCategorySelected(category.id)}
            />
          ))}
        </ScrollView>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 160,
          }}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          data={DISH_LIST}
          numColumns={2}
          renderItem={({item}) => <DishItem dish={item} key={item.id} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.icon_menu}>
        <Text style={styles.count}>{pCountDishInMenu}</Text>
        <Icon
          name="list-alt"
          size={24}
          color={theme['color-primary-default']}
        />
      </TouchableOpacity>
      <Button
        backgroundColor={theme['color-primary-default']}
        style={styles.button_next}
        title={t('common.next')}
        onPress={() => {
          navigate('ServiceScreen');
        }}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  pCountDishInMenu: sCountDishInMenu(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pAddDishToMenu: (dish: IDish) => dispatch(addDishToMenu(dish)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DishPage);

const themedStyles = StyleService.create({
  container: {
    padding: 20,
    flex: 1,
    position: 'relative',
  },

  container_category: {
    paddingVertical: 12,
  },
  category: {
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  category_text: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  icon_menu: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#ffff',
    padding: 18,
    borderRadius: 50,
  },
  count: {
    position: 'absolute',
    right: 0,
    top: -5,
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: 'color-primary-default',
    color: '#ffff',
  },
  button_next: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 12,
    minWidth: 100,
  },
  button_text: {
    fontSize: 18,
  },
});
