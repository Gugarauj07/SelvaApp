import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import About from '../screens/About';
import { Colors } from '../styles';
import CustomDrawer  from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import UserProvider from '../components/UserProvider';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

import { getAuth, onAuthStateChanged } from "firebase/auth";
const {primary, brand} = Colors;

const Drawer = createDrawerNavigator();

const  DrawerNavigator = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const auth = getAuth();
        const subscriber = onAuthStateChanged(auth, setUser);

        return subscriber;
    }, []);

    interface DrawerIconProps {
        focused?: boolean;
        color: string;
        size?: number;
      }
  
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props} user={user} />}
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
        {user ? (<UserProvider user={user.uid}>
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
            </UserProvider>) : 
            <Drawer.Screen name="Notify" component={Signup}
            options={{
                title: 'Seja Notificado!',
                drawerIcon: ({
                    focused,
                    color,
                    size
                }: DrawerIconProps) => (
                <Icon name="person" size={18} color={color} />
                ),
                
            }}/>
            }
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
        <Drawer.Screen name="Login" component={Login}
        options={{
            title: '',
        }}/>

        </Drawer.Navigator>
    );
  }

export default DrawerNavigator