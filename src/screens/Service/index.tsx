import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Header} from '../../components';
import {useTranslation} from 'react-i18next';
import ServiceItem from './components/ServiceItem';
import {IService} from '../../type/service';
import {FlatList} from 'react-native';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {navigate} from '../../utils/navigate';

const SERVICE_LIST: IService[] = [
  {
    id: 1,
    name: 'Banh Kem',
    serviceDescribe: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 100,
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
  },
  {
    id: 2,
    name: 'Banh Kem',
    serviceDescribe: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 100,
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
  },
  {
    id: 3,
    name: 'Banh Kem',
    serviceDescribe: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 100,
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
  },
  {
    id: 4,
    name: 'Banh Kem',
    serviceDescribe: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 100,
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
  },
  {
    id: 5,
    name: 'Banh Kem',
    serviceDescribe: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 100,
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
  },
  {
    id: 6,
    name: 'Banh Kem',
    serviceDescribe: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 100,
    image:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
  },
];

const ServicePage = () => {
  const [search, setSearch] = useState('');
  const {t} = useTranslation();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  return (
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
        data={SERVICE_LIST}
        renderItem={({item}) => <ServiceItem service={item} />}
        ItemSeparatorComponent={() => <View style={{height: 30}} />}
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
