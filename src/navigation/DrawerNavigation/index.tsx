import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawer from '../../components/CustomDrawer';
import {useTheme} from '@ui-kitten/components';
import HomePage from '../../screens/Home';

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        title: '',
        drawerActiveBackgroundColor: theme['color-primary-default'],
        drawerActiveTintColor: theme['color-background'],
        drawerStyle: {backgroundColor: theme['color-background']},
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({focused, color}) => (
            <Icon name="feedback" size={22} color={color} />
          ),
          title: 'HomePage',
        }}
        name="HomeScreen"
        component={HomePage}
      />
    </Drawer.Navigator>
  );
}

export default DrawerScreen;
