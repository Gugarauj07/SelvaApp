import React from 'react'
import { Text } from 'react-native'


const Home = ({navigation, route }) => {
    const {email, name} = route.params;
  return (
    <InnerContainer>
        <Text>Home page...</Text>
    </InnerContainer>
    
  )
}

export default Home