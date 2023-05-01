import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AuthNavigator from './navigators/AuthNavigator';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DrawerNavigator from './navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './components/UserProvider';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
