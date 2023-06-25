import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'

export default function usePurpleAirAndNASAData(formattedDate: string) {
    const [purpleAirData, setPurpleAirData] = useState([]);
    const [nasaData, setNasaData] = useState([]);
  
    
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
    
  
    return { purpleAirData, nasaData };
  }
  
  async function get_purpleair() {
    const ids = [
      "153914", "164961", "132041", "54999", "83933", "96041", "83849", "99747", 
      "47237", "154455", "154485", "154699", "154443", "154703", "153562", "154451", 
      "152632", "154561", "151572", "154563", "154557", "115345", "154697", "154569", 
      "153560", "154577", "154701", "120637", "154463", "154579", "154287", "154521", 
      "154435", "36051", "33105", "47213", "176351", "176363", "169781", "131787", 
      "48221", "83477", "91751", "141648", "140980", "141650", "141654", "133225", 
      "131323", "140920", "141522", "140922", "140944", "141504", "141644", "141518", 
      "141676", "141674", "35565", "35553", "35485", "35557", "143662", "143166", 
      "135192", "129323", "147593", "89997", "29277", "41371", "126889", "126707", 
      "114417", "14075", "159649", "96827", "98889", "101816", "129571", "140802", 
      "140798", "102940", "140956", "140310", "140898", "4919", "143910", "89329", 
      "143908", "99605", "127369", "127399", "127405", "127651", "127403", "127373",
      "127375", "127357", "87243", "86891", "27515", "174333", "128837", "52163", "2209", 
      "86937", "27597", "27552", "2067", "27617", "27647", "99007", "98999", "99099", 
      "99093", "103222", "99091", "99079", "111467", "111461", "111494", "111469", 
      "87559", "87163", "96401", "56843", "129137", "128643", "120219", "103330", 
      "103301", "103286", "103270", "129003", "56969", "128977", "128049", "127117", 
      "161261", "161259", "57191", "161269", "31509", "161271", "161279", "161291", 
      "161281", "165061", "165063", "165029", "165067", "13609", "25501", "31111", 
      "31091", "57309", "31103", "56879", "31107", "25499", "31109", "31299", "25891", 
      "25541", "57171", "128639", "128637", "39085", "39077", "128603", "128669", 
      "128613", "128063", "128989", "129557", "129001", "128391", "127887", "128995", 
      "129007", "128671", "128043", "128655", "128973", "128999", "129553", "129649"
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
  