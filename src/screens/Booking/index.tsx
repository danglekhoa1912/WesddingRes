import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Button, Header, TextField} from '../../components';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {IFormBooking} from '../../type/booking';
import {yupResolver} from '@hookform/resolvers/yup';
import DatePicker from '../../components/DatePicker';
import {Field} from './components';
import {StyleProp} from 'react-native';
import {ImageStyle} from 'react-native';
import Select from '../../components/Select';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {navigate, replace} from '../../utils/navigate';
import {connect, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../store';
import {IBookingStore, updateInfoBooking} from '../../store/booking';

const schema = yup.object({}).required();

interface IBookingPage {}

const BookingPage = ({}: IBookingPage) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const pBooking = useSelector<AppState>(state => state.booking);

  const pUpdateInfoBooking = (data: IFormBooking) =>
    dispatch(updateInfoBooking(data));

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormBooking>({
    defaultValues: {
      bookingDate: new Date(),
      dish: [],
      payment: 0,
      quantity: 0,
      service: [],
      session: {},
      type: {},
    },
    resolver: yupResolver(schema),
  });

  const SESSION = [
    {
      id: 1,
      label: 'Sang',
      value: 1,
    },
    {
      id: 2,
      label: 'Chieu',
      value: 2,
    },
    {
      id: 3,
      label: 'Toi',
      value: 3,
    },
  ];

  const handleChangeLobby = () => {
    replace('LobbyScreen');
  };

  const onSubmit = (data: IFormBooking) => {
    // console.log(data);
    pUpdateInfoBooking(data);
    navigate('DishScreen');
  };

  return (
    <ScrollView style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          {/* <Header filter={false} title={t('screen.booking.title')} /> */}
          <View style={styles.content}>
            <View style={styles.content_lobby}>
              <Image
                source={{
                  uri: 'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/332214673_527005792921360_376904765818597641_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=rYclMefQayQAX8tP8M5&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfAOG1cqfNYoFfZn1em_8bus4tsSgyRjRd8B2IXWxWTTTw&oe=641D18FA',
                }}
                style={styles.content_image as StyleProp<ImageStyle>}
              />
              <View style={styles.content_right}>
                <View>
                  <Text style={styles.text}>
                    {t('screen.lobby.name')}: Rose
                  </Text>
                  <Text style={styles.text}>
                    {t('common.capacity')}: 12 bàn
                  </Text>
                  <Text style={styles.text}>
                    {t('common.price')}: 100000 VND
                  </Text>
                </View>
                <Button
                  backgroundColor={theme['color-primary-default']}
                  title={t('screen.booking.change_lobby')}
                  style={styles.button}
                  onPress={handleChangeLobby}
                />
              </View>
            </View>
            <View style={styles.containerForm}>
              <Field label={t('screen.booking.booking_date')}>
                <DatePicker
                  colorIcon="black"
                  controlStyle={styles.dataPicker}
                  control={control}
                  name="bookingDate"
                />
              </Field>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Field
                  style={styles.selectField}
                  label={t('screen.booking.session')}>
                  <Select
                    placeholder={t('screen.booking.placeholder_session') || ''}
                    options={SESSION}
                    control={control}
                    name="session"
                  />
                </Field>
                <Field
                  style={styles.selectField}
                  label={t('screen.booking.type_party')}>
                  <Select
                    placeholder={
                      t('screen.booking.placeholder_type_party') || ''
                    }
                    options={SESSION}
                    control={control}
                    name="type"
                  />
                </Field>
              </View>
              <Field label={t('common.capacity')}>
                <TextField
                  placeholderTextColor={theme['color-gray']}
                  placeholder={t('screen.booking.placeholder_capacity') || ''}
                  style={styles.dataPicker}
                  control={control}
                  name="quantity"
                  keyboardType="numeric"
                />
              </Field>
            </View>
            <Button
              backgroundColor={theme['color-primary-default']}
              title={t('common.next')}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default BookingPage;

const themedStyles = StyleService.create({
  root: {
    padding: 20,
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  content_lobby: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  content_image: {
    width: 180,
    height: 180,
    borderRadius: 8,
  },
  content_right: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    paddingVertical: 6,
  },
  container_button: {
    //   backgroundColor: "red",
    //   flex: 1,
  },
  button: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  containerForm: {
    marginTop: 20,
  },
  dataPicker: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 6,
    paddingVertical: 16,
  },
  selectField: {
    width: '40%',
  },
});
