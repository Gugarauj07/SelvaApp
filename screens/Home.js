import React, { useEffect, useState, useContext } from 'react'
import { Text, StyleSheet } from 'react-native'

import MapView, { PROVIDER_GOOGLE, Heatmap, Marker, Geojson } from "react-native-maps"
import axios from 'axios';

import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase';
import { UserContext } from '../components/UserProvider';
import { cidades } from "./../components/Constants"
import { geojs } from "./../components/geojs-13-mun"

import { View, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');
const LATITUDE = -3.119027;
const LONGITUDE = -60.021731;
const LATITUDE_DELTA = 50;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

import moment from 'moment-timezone';

function usePurpleAirAndNASAData(formattedDate) {
  const [purpleAirData, setPurpleAirData] = useState([]);
  const [nasaData, setNasaData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const purpleAirResponse = await get_purpleair();
        setPurpleAirData(purpleAirResponse.data);

        const nasaResponse = await getNASAData(formattedDate);
        setNasaData(nasaResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [formattedDate]);

  return { purpleAirData, nasaData };
}

async function get_purpleair() {
  const ids = [
    '127117', '31509', '57191', '57285', '103348', '103306', '102456', '103340',
    '103288', '103270', '103286', '103301', '103330', '56891', '39085', '56831',
    '57039', '25531', '13609', '25501', '31089', '31115', '57171', '31111', '25503',
    '31105', '31101', '56879', '31091', '25551', '57309', '31095', '31103', '25891',
    '25541', '3968', '25549', '25499', '31107', '56663', '98395', '39077', '128999',
    '129649', '128701', '128997', '128973', '128063', '129557', '129001', '127887',
    '128995', '129007', '129009', '128637', '48221', '129137', '161279', '161291',
    '161261', '161259', '161269', '161281', '129339', '128987', '128049', '128977',
    '128991', '128881', '129147'
  ];

  const apiKey = '8E98D85F-BFCD-11EB-913E-42010A800082';
  const url = `https://api.purpleair.com/v1/sensors/?api_key=${apiKey}&show_only=${ids.join(",")}&fields=last_seen,name,latitude,longitude,pm2.5`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching PurpleAir data:', error);
    return [];
  }
}

async function getNASAData(formattedDate) {
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/371a0d0aef0424e422b707280cda69a4/MODIS_NRT/-74,-26,-32,05/1/${formattedDate}`;

  try {
    const response = await axios.get(url);
    const rows = response.data.split('\n').slice(1);
    const latLngs = rows.map(row => {
      const columns = row.split(',');
      const latitude = parseFloat(columns[0]);
      const longitude = parseFloat(columns[1]);
      const weight = parseFloat(1);
      return { latitude, longitude, weight };
    });
    return latLngs;
  } catch (error) {
    console.error('Error fetching NASA data:', error);
  }
}

const Home = ({ navigation, route }) => {
  const { user } = useContext(UserContext)
  const [cities, setCities] = useState([]);

  const now = moment().tz('America/Manaus');
  const year = now.format('YYYY');
  const month = now.format('MM');
  const day = now.format('DD');
  const formattedDate = `${year}-${month}-${day}`;
  
  const { purpleAirData, nasaData } = usePurpleAirAndNASAData(formattedDate);

  // console.log(purpleAirData);

  const unsubscribe = onSnapshot(
    doc(db, "UserInfo", user),
    (snapshot) => {
      const newCities = snapshot.data().citys;
      if (JSON.stringify(cities) !== JSON.stringify(newCities)) {
        setCities(newCities);
      }
      console.log("Marcadores atualizados");
    },
    (error) => {
      console.log(error);
    });

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
          <Geojson
            geojson={geojs}
            strokeColor="black"
            strokeWidth={2}
          />
        {Array.isArray(purpleAirData) && purpleAirData.length > 0 && purpleAirData.map(sensor => (
          <Marker
            key={sensor[0]}
            coordinate={{ latitude: sensor[3], longitude:  sensor[4] }}
            // title={sensor[5]}
          >
            <View
              style={{
                width: 30,
                height: 20,
                backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white', fontSize: 10 }}>{sensor[5]}</Text>
            </View>
          </Marker>
        ))}


        {Array.isArray(nasaData) && nasaData.length > 0 &&
          <Heatmap points={nasaData}
            opacity={1}
            radius={10}
            maxIntensity={100}
            gradient={{
              colors: ['#FF8C00', '#FF0000'],
              startPoints: [0.1, 1]
            }}

            heatmapMode={"POINTS_DENSITY"} />}
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default Home