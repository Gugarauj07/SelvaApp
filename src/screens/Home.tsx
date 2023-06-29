import React, { useEffect, useState, useRef } from 'react'
import styles from "../styles"

import MapView, { PROVIDER_GOOGLE, Heatmap, Marker, Geojson } from "react-native-maps"

// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from '../config/firebase';
import  {geojs}  from "../assets/amazonia_legal"
import { View, Dimensions, Text } from 'react-native'
import {getNASAData, get_purpleair} from "../utils/GetData"
import RealSensorMarker from "../components/RealSensorMarker"
import Checkbox from 'expo-checkbox';

import moment from 'moment-timezone';

const { height, width } = Dimensions.get('window');
const LATITUDE = -3.119027;
const LONGITUDE = -60.021731;
const LATITUDE_DELTA = 50;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const southAmericaBounds = {
  latitude: -25.0, // Latitude do centro da América do Sul
  longitude: -60.0, // Longitude do centro da América do Sul
  latitudeDelta: 50.0, // Variação da latitude a ser exibida (zoom)
  longitudeDelta: 50.0, // Variação da longitude a ser exibida (zoom)
};



const now = moment().tz('America/Manaus');
const year = now.format('YYYY');
const month = now.format('MM');
const day = now.format('DD');
const formattedDate = `${year}-${month}-${day}`;


const Home = () => {
  const mapRef = useRef<MapView>(null);

  const [showPurpleAir, setShowPurpleAir] = useState(true);
  const [showNASA, setShowNASA] = useState(true);
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name === 'purpleAir') {
      setShowPurpleAir(checked);
    } else if (name === 'nasa') {
      setShowNASA(checked);
    }
  };

  // const onRegionChange = (region: any) => {
  //   // Verifique se a região atual está dentro dos limites da América do Sul
  //   if (
  //     region.latitude < southAmericaBounds.latitude - southAmericaBounds.latitudeDelta / 2 ||
  //     region.latitude > southAmericaBounds.latitude + southAmericaBounds.latitudeDelta / 2 ||
  //     region.longitude < southAmericaBounds.longitude - southAmericaBounds.longitudeDelta / 2 ||
  //     region.longitude > southAmericaBounds.longitude + southAmericaBounds.longitudeDelta / 2
  //   ) {
  //     mapRef.current?.animateToRegion(region: southAmericaBounds)
  //   }
  // };

  return (
    <View style={styles.mapContainer}>

    

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,}}
          // onRegionChange={region => onRegionChange(region)}
          >

          <Geojson
            geojson={geojs}
            strokeColor="black"
            strokeWidth={2}
          />

        {showPurpleAir && Array.isArray(purpleAirData) && purpleAirData.length > 0 && purpleAirData.map((sensor, index) => (
          <RealSensorMarker key={index} sensor={sensor}/>
        ))}


        {showNASA && Array.isArray(nasaData) && nasaData.length > 0 &&
          <Heatmap points={nasaData}
            opacity={1}
            radius={10}
            gradient={{
              colorMapSize: 256,
              colors: ['#FF8C00', '#FF0000'],
              startPoints: [0.1, 1]
            }}
            />}

      </MapView>

      <View style={styles.overlay}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={showPurpleAir}
            style={styles.checkbox2}
            color={showPurpleAir ? '#4630EB' : undefined}
            onValueChange={(checked) => handleCheckboxChange('purpleAir', checked)}
          />
          <Text>Qualidade do Ar - Reais</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={showNASA}
            style={styles.checkbox2}
            color={showNASA ? '#4630EB' : undefined}
            onValueChange={(checked) => handleCheckboxChange('nasa', checked)}
          />
          <Text>Queimadas (Modis 24h)</Text>
        </View>
      </View>
    </View>
  )
}

export default Home