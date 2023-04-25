import React from 'react'
import { Text } from 'react-native'


const Home = ({navigation, route }) => {
    const {email, name} = route.params;
  return (
    <Text>{email}</Text>
  )
}

export default Home