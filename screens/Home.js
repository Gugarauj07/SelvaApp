import React from 'react'
import { Text } from 'react-native'
import {
    Colors,
    StyledContainer,
    InnerContainer,
} from "./../components/styles"

const Home = ({navigation, route }) => {
  return (
    <StyledContainer>
        <InnerContainer>
            <Text>Home page...</Text>
        </InnerContainer>
    </StyledContainer>
  )
}

export default Home