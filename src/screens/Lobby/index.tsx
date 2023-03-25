import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@ui-kitten/components';
import {Button, Card, Header, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../utils/navigate';

const LobbyPage = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const {t} = useTranslation();

  const handleViewDetail = () => {
    navigate('LoobyDetailScreen', {
      id: 1,
    });
  };

  const handleChooseLobby = () => {
    navigate('BookingScreen');
  };

  return (
    <View style={styles.root}>
      <Header
        placeholderSearch={t('screen.lobby.placeholder_search') || ''}
        search={search}
        setSearch={setSearch}
        title={t('screen.lobby.title')}
      />
      <View style={styles.containerCard}>
        <Card style={styles.card}>
          <TouchableOpacity onPress={handleViewDetail} style={{flex: 1}}>
            <ImageBackground
              borderTopLeftRadius={8}
              borderTopRightRadius={8}
              style={styles.background_image}
              source={{
                uri: 'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/336265420_778671919931668_3513491535690242185_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=x8jRRkUvfWwAX-M5xp0&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfANBQa4O-akPzWqbg54otyJG3YjLfdA5woYIHVDAecbkg&oe=641D5524',
              }}>
              <View style={styles.container_content}>
                <Text style={styles.text_content}>Rose</Text>
                <Text style={styles.text_content}>5.000.000 VND</Text>
              </View>
            </ImageBackground>
            <View style={styles.container_button}>
              <Button
                style={styles.button}
                backgroundColor={theme['color-primary-default']}
                variant="outlined"
                title={t('screen.lobby.view_detail')}
                onPress={handleViewDetail}
              />
              <Button
                style={styles.button}
                variant="outlined"
                title={t('screen.lobby.choose_lobby')}
                onPress={handleChooseLobby}
              />
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

export default LobbyPage;

const styles = StyleSheet.create({
  root: {
    padding: 24,
  },
  containerCard: {
    // marginTop: 12,
  },
  card: {
    height: 280,
  },
  background_image: {
    height: 200,
    borderRadius: 8,
  },
  container_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text_content: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
