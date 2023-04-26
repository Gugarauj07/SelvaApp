import React, {useEffect, useState,} from 'react'
import { Text, StyleSheet} from 'react-native'
import {
    Colors,
    StyledContainer,
    InnerContainer,
} from "./../components/styles"
import MapView, { PROVIDER_GOOGLE, Heatmap } from "react-native-maps"
import axios from 'axios';

import { View, Dimensions } from 'react-native'
const { height, width } = Dimensions.get( 'window' );
const LATITUDE = 13.91832; 
const LONGITUDE = -83.75819; 
const LATITUDE_DELTA = 50;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);



const Home = ({navigation, route }) => {

  const [dataPoints, setdataPoints] = useState();

  useEffect(() => {
    axios
    .get("https://firms.modaps.eosdis.nasa.gov/api/area/csv/371a0d0aef0424e422b707280cda69a4/MODIS_NRT/-85,-57,-32,14/1/2023-04-26")
    .then((response) => {
        const rows = response.data.split('\n').slice(1);
        const latLngs = rows.map(row => {
          const columns = row.split(',');
          const latitude = parseFloat(columns[0]);
          const longitude = parseFloat(columns[1]);
          const weight = parseFloat(1);
          return { latitude, longitude, weight };
        });
        setdataPoints(latLngs)
        console.log(latLngs);
    });
  }, []);

  return (
    <View style={styles.container}>

      <MapView
      	provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
          
        }}>
          {dataPoints &&
          <Heatmap points={dataPoints}
                          opacity={1}
                          radius={50}
                          maxIntensity={1}
                          // gradient={[
                          //   { color: '#FFFF00', value: 0.1 },
                          //   { color: '#FF8C00', value: 0.5 },
                          //   { color: '#FF0000', value: 1 }
                          // ]}
                          gradientSmoothing={10}
                          heatmapMode={"POINTS_DENSITY"}/>}
      </MapView>
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