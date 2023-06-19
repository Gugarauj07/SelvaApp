import 'react-native-gesture-handler'
import { useState, useEffect } from 'react';
import AuthNavigator from './navigators/AuthNavigator';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DrawerNavigator from './navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './components/UserProvider';
import Notification from './components/notification';
// import {app} from './config/firebase'

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const auth = getAuth();
      const subscriber = onAuthStateChanged(auth, setUser);

      return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Notification />
      {user ? (<UserProvider user={user.uid}>
        <DrawerNavigator />
      </UserProvider>) : (
          <AuthNavigator />
      )}
    </NavigationContainer>
    );
}