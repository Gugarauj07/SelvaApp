import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import About from '../screens/About';
import { Colors } from '../components/styles';
import CustomDrawer  from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons';

const {primary, brand} = Colors;

const Drawer = createDrawerNavigator();

const  DrawerNavigator = () => {

    interface DrawerIconProps {
        focused?: boolean;
        color: string;
        size?: number;
      }
  
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveBackgroundColor: brand,
                drawerActiveTintColor: primary,
                drawerLabelStyle: {
                marginLeft: -20,
                },}}
                >
          <Drawer.Screen name="Home Drawer" component={Home} 
            options={{
                title: 'Mapa',
                drawerIcon: ({
                    focused,
                    color,
                    size
                }: DrawerIconProps) => (
                <Icon name="location" size={18} color={color} />
                ),
            }}/>
          <Drawer.Screen name="Profile" component={Profile} 
            options={{
                title: 'Perfil',
                drawerIcon: ({
                    focused,
                    color,
                    size
                }: DrawerIconProps) => (
                <Icon name="person" size={18} color={color} />
                ),
            }}/>
          <Drawer.Screen name="About" component={About} 
            options={{
                title: 'Quem somos?',
                drawerIcon: ({
                    focused,
                    color,
                    size
                }: DrawerIconProps) => (
                <Icon name="information-circle" size={18} color={color} />
                ),
            }}/>
        </Drawer.Navigator>
    );
  }

export default DrawerNavigator