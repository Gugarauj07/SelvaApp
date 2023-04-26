import React, {useEffect, useState,} from 'react'
import { Text, StyleSheet} from 'react-native'
import {
    Colors,
    StyledContainer,
    InnerContainer,
} from "./../components/styles"
import MapView from "react-native-maps"
import { View, Dimensions } from 'react-native'
const { height, width } = Dimensions.get( 'window' );
const LATITUDE = -3.10719; 
const LONGITUDE = -60.0261; 
const LATITUDE_DELTA = 30;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const Home = ({navigation, route }) => {

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent:'center',
  },
  map: {
    flex:1,
    width: "100%"
  }
})

export default Home