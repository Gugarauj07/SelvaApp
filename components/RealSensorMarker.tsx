import { Marker } from "react-native-maps"
import { View, Text } from 'react-native'


export type AqiBand = {
    inf: number,
    sup: number,
    name: string,
    color: string,
    rgb: number[],
  }
  
  
  export const bands: AqiBand[] = [
    {'inf': 0, 'sup': 25, 'name': 'Boa', 'color': '#50f060', 'rgb': [80, 240, 96]},
    {'inf': 25, 'sup': 50, 'name': 'Moderada', 'color': '#ffff00', 'rgb': [255, 255, 0]},
    {'inf': 50, 'sup': 75, 'name': 'Ruim', 'color': '#feaa72', 'rgb': [254, 170, 114]},
    {'inf': 75, 'sup': 125, 'name': 'Muito Ruim', 'color': '#ff0000', 'rgb': [255, 0, 0]},
    {'inf': 125, 'sup': 160, 'name': 'Péssimo', 'color': '#980065', 'rgb': [152, 0, 101]},
  ];
  
  

  const RealSensorMarker = (sensor: any) => {
    
    const latitude: number = parseFloat(sensor[3]!)
    const longitude: number = parseFloat(sensor[4]!)
    const pm25: number = parseFloat(sensor[5]!)

    const color: number[] = [0, 0, 0]
  
    for (let i = 0; i < bands.length-1; i++) {
      const band1 = bands[i];
      const band2 = bands[i+1];
      if (pm25 >= band1!.inf && pm25 <= band2!.inf) {
        const alpha: number = (pm25 - band1!.inf)/(band2!.inf - band1!.inf);
        color[0] = band2!.rgb[0]!*alpha + band1!.rgb[0]!*(1-alpha);
        color[1] = band2!.rgb[1]!*alpha + band1!.rgb[1]!*(1-alpha);
        color[2] = band2!.rgb[2]!*alpha + band1!.rgb[2]!*(1-alpha);
        break;
      }
    }
    
    const bgColorStr = `${color[0]}, ${color[1]}, ${color[2]}`;
    const r = 50;
    const brColorStr = `${Math.max(color[0]!-r)}, ${Math.max(color[1]!-r)}, ${Math.max(color[2]!-r)}`;
    const txtColor = (pm25 >= 75) ? '#fff' : '#000';
  
    return (
      <Marker
              key={sensor[0]}
              coordinate={{ latitude: latitude, longitude:  longitude }}
              // title={sensor[5]}
            >
              <View
                style={{
                  width: 30,
                  height: 20,
                  backgroundColor: bgColorStr,
                  borderColor: brColorStr,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: txtColor, fontSize: 10 }}>{pm25}</Text>
  
              </View>
            </Marker>
    );
  }

export default RealSensorMarker;