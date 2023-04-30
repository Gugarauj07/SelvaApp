import { StyleSheet, Text, View } from 'react-native';

import AuthNavigator from './navigators/AuthNavigator';


export default function App() {
  return (<AuthNavigator />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
