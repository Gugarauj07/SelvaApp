import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './../screens/Home';
import Profile from './../screens/Profile';
import { Colors } from '../components/styles';
import CustomDrawer  from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons';

const {primary, brand} = Colors;

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator 
            // drawerContent={props => <CustomDrawer {...props} />}
            // screenOptions={{
            //     headerShown: false,
            //     drawerActiveBackgroundColor: brand,
            //     drawerActiveTintColor: primary,
            //     drawerLabelStyle: {
            //     marginLeft: -20,
            //     },}}
                >
          <Drawer.Screen name="Home Drawer" component={Home} 
            options={{
                title: 'Home',
                drawerIcon: ({focused, color, size}) => (
                <Icon name="home-sharp" size={18} color={color} />
                ),
            }}/>
          <Drawer.Screen name="Profile" component={Profile} 
            options={{
                title: 'Profile',
                drawerIcon: ({focused, color, size}) => (
                <Icon name="information-circle-outline" size={18} color={color} />
                ),
            }}/>
        </Drawer.Navigator>
    );
  }

export default DrawerNavigator