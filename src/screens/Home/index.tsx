import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import Carousel from 'react-native-snap-carousel';
import {CarouselCardItem, ItemList} from './components';
import {ITEM_WIDTH, SLIDER_WIDTH} from './components/CarouselCardItem';
import {
  Intro1,
  Intro10,
  Intro2,
  Intro3,
  Intro4,
  Intro5,
  Intro6,
  Intro7,
  Intro8,
  Intro9,
} from '../../assets';
import {useTranslation} from 'react-i18next';
import {Lobby_List} from '../../mock/lobby';
import {Dish_List} from '../../mock/dish';
import {Service_List} from '../../mock/service';
import {connect, useDispatch} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {getLobbyList} from '../../store/lobby/thunkApi';
import {getListService} from '../../store/service/thunkApi';
import {getDishList} from '../../store/dish/thunkApi';
import {IServiceRequestParams} from '../../type/service';
import {IRequestParams} from '../../type/dish';

interface IHomePage {}

const HomePage = ({}: IHomePage) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const pGetLobbyList = () => dispatch(getLobbyList());
  const pGetDishList = (params: IRequestParams) =>
    dispatch(getDishList(params));
  const pGetServiceList = (params: IServiceRequestParams) =>
    dispatch(getListService(params));

  const carouselItems = [
    Intro1,
    Intro2,
    Intro3,
    Intro4,
    Intro5,
    Intro6,
    Intro7,
    Intro8,
    Intro9,
    Intro10,
  ];

  const lobbyList = useMemo(
    () =>
      Lobby_List.map(lobby => ({
        id: lobby.id,
        name: lobby.name,
        price: lobby.price,
        image: lobby.image,
      })),
    [],
  );
  const dishList = useMemo(
    () =>
      Dish_List.map(dish => ({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
      })),
    [],
  );
  const serviceList = useMemo(
    () =>
      Service_List.map(service => ({
        id: service.id,
        name: service.name,
        price: service.price,
        image: service.image,
      })),
    [],
  );

  useEffect(() => {
    // (async()=>{
    // 	const lobbyList=await pGetLobbyList()
    // 	const dishList=await
    // })()
    pGetLobbyList().then(data => {
      //   console.log(data);
    });
    pGetDishList({page: 1}).then(data => {
      //   console.log(data);
    });
    pGetServiceList({page: 1}).then(data => {
      //   console.log(data);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          data={carouselItems}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={1}
          useScrollView={true}
          loop
          contentContainerCustomStyle={{
            alignItems: 'center',
            padding: 18,
          }}
        />
      </View>
      <ItemList
        navigateToDetail="LobbyDetailScreen"
        navigateTo="LobbyScreen"
        label={t('screen.lobby.title')}
        list={lobbyList}
      />
      <ItemList
        navigateTo="DishScreen"
        label={t('screen.dish.title')}
        list={dishList}
      />
      <ItemList
        navigateTo="ServiceScreen"
        label={t('screen.service.title')}
        list={serviceList}
      />
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({});

export default HomePage;

const themedStyles = StyleService.create({
  main: {
    backgroundColor: 'color-background',
  },
  container_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
