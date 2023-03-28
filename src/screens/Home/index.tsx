import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
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
import {IService, IServiceRequestParams} from '../../type/service';
import {IDish, IRequestParams} from '../../type/dish';
import {ILobby} from '../../type/lobby';

interface IHomePage {
  pGetLobbyList: (params: IServiceRequestParams) => Promise<any>;
  pGetDishList: (params: IRequestParams) => Promise<any>;
  pGetServiceList: (params: IServiceRequestParams) => Promise<any>;
}

const HomePage = ({
  pGetDishList,
  pGetLobbyList,
  pGetServiceList,
}: IHomePage) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {t} = useTranslation();
  const [lobbyList, setLobbyList] = useState<ILobby[]>([]);
  const [dishList, setDishList] = useState<IDish[]>([]);
  const [serviceList, setServiceList] = useState<IService[]>([]);

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

  useEffect(() => {
    pGetLobbyList({page: 1}).then(data => {
      setLobbyList(data?.payload?.record);
    });
    pGetDishList({page: 1}).then(data => {
      setDishList(data?.payload?.record);
    });
    pGetServiceList({page: 1}).then(data => {
      setServiceList(data?.payload?.record);
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
      {!!lobbyList?.length && (
        <ItemList
          navigateToDetail="LobbyDetailScreen"
          navigateTo="LobbyScreen"
          label={t('screen.lobby.title')}
          list={lobbyList}
        />
      )}
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetLobbyList: (params: IServiceRequestParams) =>
    dispatch(getLobbyList(params)),
  pGetDishList: (params: IRequestParams) => dispatch(getDishList(params)),
  pGetServiceList: (params: IServiceRequestParams) =>
    dispatch(getListService(params)),
});

export default connect(null, mapDispatchToProps)(HomePage);

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
