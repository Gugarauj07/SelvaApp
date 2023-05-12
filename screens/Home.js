import React, {useEffect, useState, useContext} from 'react'
import { Text, StyleSheet} from 'react-native'
import {
    Colors,
    StyledContainer,
    InnerContainer,
} from "./../components/styles"
import MapView, { PROVIDER_GOOGLE, Heatmap, Marker } from "react-native-maps"
import axios from 'axios';
import {getDocumento} from "../config/firebase"
import { UserContext } from '../components/UserProvider'; 
import {cidades} from "./../components/Constants"

import { View, Dimensions } from 'react-native'
const { height, width } = Dimensions.get( 'window' );
const LATITUDE = 13.91832; 
const LONGITUDE = -83.75819; 
const LATITUDE_DELTA = 50;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

import moment from 'moment-timezone';



const Home = ({navigation, route }) => {

  const [dataPoints, setdataPoints] = useState();
  
  const {user} = useContext(UserContext)
  const [cities, setCities] = useState([]);

  const now = moment().tz('America/Manaus');
  const year = now.format('YYYY');
  const month = now.format('MM');
  const day = now.format('DD');
  const formattedDate = `${year}-${month}-${day}`;
  console.log(cities);


  useEffect(() => {
    axios
    .get("https://firms.modaps.eosdis.nasa.gov/api/area/csv/371a0d0aef0424e422b707280cda69a4/MODIS_NRT/-74,-26,-32,05/1/" +formattedDate)
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
    });
    getDocumento(user)
    .then(data => {
        setCities(data["citys"])
    })
    .catch(error => {
        console.error(error);
    });
  }, [formattedDate]);

  const cityMarkers = cities.map(city => {
    const { key, latitude, longitude } = cidades.find(item => item.value === city);
    return {
      key: key,
      value: city,
      latitude: latitude,
      longitude: longitude,
    }
  });


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
          {cities && cityMarkers.map(city => (
            <Marker
              key={city.key}
              coordinate={{ latitude: city.latitude, longitude: city.longitude }}
              title={city.value}
            />
          ))}

          {dataPoints &&
          <Heatmap points={dataPoints}
                          opacity={1}
                          radius={10}
                          maxIntensity={100}
                          gradient={{
                            colors:['#FF8C00','#FF0000'],
                            startPoints: [0.1, 1]}}
                            // { color: '#FFFF00', value: 0.1 },
                            // { color: '#FF8C00', value: 0.5 },
                            // { color: '#FF0000', value: 1 }
                          
                          
                          heatmapMode={"POINTS_DENSITY"}/> }
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