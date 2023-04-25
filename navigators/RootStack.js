import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Home from './../screens/Home';
import { Colors } from '../components/styles';
const {primary, tertiary} = Colors;
const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerStyled: {
                backgroundColor: 'transparent',
            },
            headerTintColor:tertiary,
            headerTransparent: true,
            headerTitle: "",
            headerLeftContainerStyle: {
                paddingLeft: 20
            }
        }}
        initialRouteName='Login'
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={Signup}/>
            <Stack.Screen name="Home" component={Home} options={{headerLeft:null}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack