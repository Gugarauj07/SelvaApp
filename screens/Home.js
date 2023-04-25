import React from 'react'
import { Text } from 'react-native'
import {
    Colors,
    StyledContainer,
    InnerContainer,
} from "./../components/styles"

const Home = ({navigation, route }) => {
    const {email, name} = route.params;
  return (
    <StyledContainer>
        <InnerContainer>
            <Text>Home page...</Text>
        </InnerContainer>
    </StyledContainer>
  )
}

export default Home