/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as eva from '@eva-design/eva';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import './src/i18n/i18n';
import {store} from './src/store';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {default as theme} from './theme.json';
import RootNavigate from './src/navigation/RootNavigate';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/navigate';
import {Provider} from 'react-redux';
import messaging, {firebase} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import {getStorage} from './src/utils/storage';
import {useTranslation} from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Require cycle:']);

type SectionProps = PropsWithChildren<{
  title: string;
}>;
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {i18n} = useTranslation();

  //   const {t, i18n} = useTranslation();
  //   const [value, setValue] = useState();

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };

  //   const registerFCM = async () => {
  //     try {
  //       await messaging().requestPermission();
  //     } catch (error) {
  //       console.log('permission rejected');
  //     }

  //     // await messaging().registerDeviceForRemoteMessages();
  //     try {
  //       console.log(await messaging().getToken());
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     // Update backend (e.g. Firestore) with our token for the user
  //     // const uid = firebase.auth().currentUser.uid;
  //     // await firebase.firestore().doc(`users/${uid}`)
  //     //   .update({
  //     //     fcmTokens: firebase.firestore.FieldValues.arrayUnion(fcmToken),
  //     //   });
  //     //   }
  //   };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    getStorage('lang').then(data => {
      if (data) i18n.changeLanguage(data);
    });
    SplashScreen.hide();
    return unsubscribe;
  }, []);

  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <Provider store={store}>
        <SafeAreaView style={styles.root}>
          <NavigationContainer ref={navigationRef}>
            <RootNavigate />
          </NavigationContainer>
          <Toast />
        </SafeAreaView>
      </Provider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
