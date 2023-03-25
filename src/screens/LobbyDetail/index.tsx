import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import {DetailProps} from '../../navigation/RootNavigate';
import {goBack, navigate} from '../../utils/navigate';

const LobbyDetailPage = ({route}: DetailProps) => {
  //   console.log(route);
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const handleBooking = () => {
    navigate('BookingScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        borderBottomLeftRadius={8}
        borderBottomRightRadius={8}
        source={{
          uri: 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/334558732_1367481630733289_487941678723319369_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=Xiz8jRJTnQoAX-FBLoi&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBgQn5kVYRdRQRXNx_iK9P4Y8RLn5f8wvPLpCVn_Jfa0Q&oe=6407BAB3',
        }}
        style={styles.background_image}>
        <TouchableOpacity onPress={() => {}} style={styles.button_back}>
          <Icon
            onPress={() => {
              goBack();
            }}
            color={theme['color-primary-default']}
            name="left"
            size={30}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.container_content}>
        <Text style={styles.title}>Rose</Text>
        <Text style={styles.content}>
          hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi
        </Text>
        <View style={styles.container_detail}>
          <View>
            <Text style={styles.content}>Price</Text>
            <Text>10.000.000VND</Text>
          </View>
          <View>
            <Text style={styles.content}>Capacity</Text>
            <Text>20 table</Text>
          </View>
        </View>
      </View>
      <View style={styles.container_button}>
        <Button
          backgroundColor={theme['color-primary-default']}
          title="Book Now"
          onPress={handleBooking}
        />
      </View>
    </View>
  );
};

export default LobbyDetailPage;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'color-background',
  },
  background_image: {
    height: 300,
    borderRadius: 8,
  },
  button_back: {
    top: 20,
    left: 20,
  },
  container_content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 15,
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'justify',
  },
  container_detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 20,
  },
  button_text: {
    fontSize: 18,
    fontWeight: '700',
  },
  container_button: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
