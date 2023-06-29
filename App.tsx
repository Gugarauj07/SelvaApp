import 'react-native-gesture-handler'
import { useState, useEffect } from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DrawerNavigator from './src/navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './src/components/UserProvider';
// import Notification from './components/notification';
// import {app} from './config/firebase'

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
      const auth = getAuth();
      const subscriber = onAuthStateChanged(auth, setUser);

      return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {/* <Notification /> */}
      {user ? (<UserProvider user={user.uid}>
        <DrawerNavigator />
      </UserProvider>) : (
          <AuthNavigator />
      )}
    </NavigationContainer>
    );
}