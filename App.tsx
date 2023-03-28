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

type SectionProps = PropsWithChildren<{
  title: string;
}>;
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
export const stotreManagement = store;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   //   const t = useTranslate();
//   //   console.log(t);
//   console.log(process.env.REACT_APP_BASE_URL);

//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
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

    return unsubscribe;
  }, []);

  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <Provider store={store}>
        <SafeAreaView style={styles.root}>
          <NavigationContainer ref={navigationRef}>
            <RootNavigate />
          </NavigationContainer>
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
