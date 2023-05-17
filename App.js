import 'react-native-gesture-handler'
import { useState, useEffect } from 'react';
import AuthNavigator from './navigators/AuthNavigator';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DrawerNavigator from './navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './components/UserProvider';
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
      {user ? (<UserProvider user={user.uid}>
        <DrawerNavigator />
      </UserProvider>) : (
          <AuthNavigator />
      )}
    </NavigationContainer>
    );
}