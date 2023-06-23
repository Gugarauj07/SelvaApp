import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'

export default function usePurpleAirAndNASAData(formattedDate: string) {
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
  
  async function getNASAData(formattedDate: string) {
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/371a0d0aef0424e422b707280cda69a4/MODIS_NRT/-74,-26,-32,05/1/${formattedDate}`;
  
    try {
      const response = await axios.get(url);
      const rows = response.data.split('\n').slice(1);
      const latLngs = rows.map((row: any) => {
        const columns = row.split(',');
        const latitude = parseFloat(columns[0]);
        const longitude = parseFloat(columns[1]);
        const weight = parseFloat("1");
        return { latitude, longitude, weight };
      });
      return latLngs;
    } catch (error) {
      console.error('Error fetching NASA data:', error);
    }
  }
  