import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDrawer from '../../components/CustomDrawer';
import {useTheme} from '@ui-kitten/components';
import HomePage from '../../screens/Home';
import {getStorage} from '../../utils/storage';
import {navigate} from '../../utils/navigate';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {useEffect} from 'react';
import {getUser} from '../../store/user/thunkApi';

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
