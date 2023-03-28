import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Header} from '../../components';
import {useTranslation} from 'react-i18next';
import ServiceItem from './components/ServiceItem';
import {IService} from '../../type/service';
import {FlatList} from 'react-native';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {navigate} from '../../utils/navigate';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {getListService} from '../../store/service/thunkApi';

const ServicePage = () => {
  const {t} = useTranslation();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [page, setPage] = useState(0);
  const isLatestsPage = useRef(false);

  const fetchMoreDish = () => {
    if (!isLatestsPage.current) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dispatch(
      getListService({
        page: page + 1,
        searchByName: search,
      }),
    ).then(data => {
      setServiceList(data?.payload?.record);
      isLatestsPage.current = page + 1 >= data?.payload?.totalPage;
    });
  }, [search, page]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Header
          placeholderSearch={t('screen.lobby.placeholder_search') || ''}
          search={search}
          setSearch={setSearch}
          title={t('screen.service.title')}
        />
        <FlatList
          contentContainerStyle={{paddingVertical: 20}}
          showsVerticalScrollIndicator={false}
          data={serviceList}
          renderItem={({item}) => <ServiceItem service={item} />}
          ItemSeparatorComponent={() => <View style={{height: 30}} />}
          onEndReached={fetchMoreDish}
          onEndReachedThreshold={0.2}
        />
        <Button
          backgroundColor={theme['color-primary-default']}
          style={styles.button_next}
          title={t('common.next')}
          onPress={() => {
            navigate('BookingDetailScreen');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServicePage;

const themedStyles = StyleService.create({
  root: {
    backgroundColor: 'color-background',
    padding: 20,
    paddingBottom: 0,
    position: 'relative',
    flex: 1,
  },
  button_next: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    minWidth: 120,
  },
});
