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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import './src/i18n/i18n';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useTranslation} from 'react-i18next';
import {store} from './src/store';
import LoginPage from './src/screens/Login';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {default as theme} from './theme.json';
import ImgPicker from './src/components/ImgPicker';
import LobbyPage from './src/screens/Lobby';
import RegisterPage from './src/screens/Register';
import LobbyDetailPage from './src/screens/LobbyDetail';
import DishPage from './src/screens/Dish';
import ServicePage from './src/screens/Service';
import BookingPage from './src/screens/Booking';
import RootNavigate from './src/navigation/RootNavigate';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/navigate';
import {Provider} from 'react-redux';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

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
