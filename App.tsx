import 'react-native-gesture-handler'

import DrawerNavigator from './src/navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
// import Notification from './components/notification';
// import {app} from './config/firebase';

export default function App() {
  

  return (
    <NavigationContainer>
      
        <DrawerNavigator />
      
    </NavigationContainer>
    );
}