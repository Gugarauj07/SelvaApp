import React, { useEffect, useState } from 'react'
import styles from "./../components/styles"

import MapView, { PROVIDER_GOOGLE, Heatmap, Marker, Geojson } from "react-native-maps"

// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from '../config/firebase';
import  {geojs}  from "../assets/amazonia_legal"
import { View, Dimensions } from 'react-native'
import {getNASAData, get_purpleair} from "../components/GetData"
import RealSensorMarker from "../components/RealSensorMarker"

import moment from 'moment-timezone';

const { height, width } = Dimensions.get('window');
const LATITUDE = -3.119027;
const LONGITUDE = -60.021731;
const LATITUDE_DELTA = 50;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const now = moment().tz('America/Manaus');
const year = now.format('YYYY');
const month = now.format('MM');
const day = now.format('DD');
const formattedDate = `${year}-${month}-${day}`;


const Home = () => {
  // const { user } = useContext(UserContext)
  // const [cities, setCities] = useState([]);
  const [purpleAirData, setPurpleAirData] = useState([]);
  const [nasaData, setNasaData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const purpleAirResponse = await get_purpleair();
        setPurpleAirData(purpleAirResponse.data);

        const nasaResponse = await getNASAData(formattedDate);
        setNasaData(nasaResponse);

        console.log("1")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  

  // const unsubscribe = onSnapshot(
  //   doc(db, "UserInfo", user),
  //   (snapshot) => {
  //     const newCities = snapshot.data()?.citys;
  //     if (JSON.stringify(cities) !== JSON.stringify(newCities)) {
  //       setCities(newCities);
  //     }
  //     console.log("Marcadores atualizados");
  //   },
  //   (error) => {
  //     console.log(error);
  //   });

  // const cityMarkers = cities.map(city => {
  //   const { key, latitude, longitude } = cidades.find(item => item.value === city);
  //   return {
  //     key: key,
  //     value: city,
  //     latitude: latitude,
  //     longitude: longitude,
  //   }
  // });

  return (
    <View style={styles.mapContainer}>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA

        }}>
          <Geojson
            geojson={geojs}
            strokeColor="black"
            strokeWidth={2}
          />

        {Array.isArray(purpleAirData) && purpleAirData.length > 0 && purpleAirData.map((sensor, index) => (
          <RealSensorMarker key={index} sensor={sensor}/>
        ))}


        {Array.isArray(nasaData) && nasaData.length > 0 &&
          <Heatmap points={nasaData}
            opacity={1}
            radius={10}
            maxIntensity={100}
            // @ts-expect-error TS(2741): Property 'colorMapSize' is missing in type '{ colo... Remove this comment to see the full error message
            gradient={{
              colors: ['#FF8C00', '#FF0000'],
              startPoints: [0.1, 1]
            }}

            heatmapMode={"POINTS_DENSITY"} />}
      </MapView>
    </View>
  )
}

export default Home