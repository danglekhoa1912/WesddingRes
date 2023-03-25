import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {StyleService, useStyleSheet, useTheme} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, Text, TextField} from '../../components';
import {useForm} from 'react-hook-form';
import {IFormRegister} from '../../type/form';
import DatePicker from '../../components/DatePicker';
import ImgPicker from '../../components/ImgPicker';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';
import {goBack} from '../../utils/navigate';
import {COLORS} from '../../utils/color';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Please enter your email')
      .email('Email invalidate'),
    password: yup.string().required('Please enter your password'),
    //   .matches(
    //     new RegExp(
    //       '^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$',
    //     ),
    //     'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    //   ),
    name: yup.string().required('Please enter your name'),
    birthday: yup
      .date()
      .test('birthday', 'Please choose a valid date of birth', value => {
        return moment(new Date()).diff(moment(value), 'years') >= 18;
      }),
    mobile: yup.string().required('Please enter your mobile').min(10).max(12),
    avatar: yup.string().required('Please choise your avatar'),
  })
  .required();

const RegisterPage = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormRegister>({
    defaultValues: {
      email: '',
      name: '',
      mobile: '',
      birthday: new Date(),
      avatar: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormRegister) => {
    // console.log(data);
  };

  return (
    <ScrollView style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}>
              <Icon size={30} name="back" color={COLORS.tertiary} />
            </TouchableOpacity>
            <Text style={styles.title} category="h1">
              Create Account.
            </Text>
          </View>
          <View style={styles.input}>
            <ImgPicker control={control} name="avatar" />
            <TextField
              keyboardType="email-address"
              control={control}
              name="email"
              placeholder="Email"
            />
            <TextField control={control} name="name" placeholder="Name" />
            <TextField
              keyboardType="numeric"
              control={control}
              name="mobile"
              placeholder="Mobile"
            />
            <DatePicker
              max={new Date()}
              min={new Date(0)}
              control={control}
              name="birthday"
            />
            <TextField
              secureTextEntry
              control={control}
              name="password"
              placeholder="Password"
            />
          </View>
          <View>
            <Button onPress={handleSubmit(onSubmit)} title="Register" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default RegisterPage;

const themedStyles = StyleService.create({
  root: {
    backgroundColor: 'color-primary-default',
  },
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    marginVertical: 12,
  },
  input: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
