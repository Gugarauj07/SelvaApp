import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;
// #EAB204 - amarelo #003625 - verde #3C3C3B - cinza
export const Colors = {
    primary: "#fff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#003625",
    yellow: "#EAB204",
    green: "#86B049",
    red: "#EF4444",
    gray: "#3C3C3B",
    ligthblue: "#03a9f4"
};

const { primary, secondary, tertiary, darkLight, brand, yellow, green, red, ligthblue } = Colors;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      paddingTop: StatusBarHeight + 30,
      backgroundColor: primary,
    },
    innerContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    pageLogo: {
      width: 250,
      height: 210,
      padding: 0,
    },
    pageTitle: {
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      color: brand,
      padding: 10,
    },
    subTitle: {
      fontSize: 18,
      margin: 11,
      letterSpacing: 1,
      fontWeight: 'bold',
      color: tertiary,
    },
    formArea: {
      width: '90%',
    },
    textInput: {
      backgroundColor: secondary,
      padding: 15,
      paddingLeft: 55,
      paddingRight: 55,
      borderRadius: 5,
      fontSize: 16,
      height: 60,
      marginVertical: 3,
      marginBottom: 10,
      color: tertiary,
    },
    inputLabel: {
      color: tertiary,
      fontSize: 13,
      textAlign: 'left',
    },
    leftIcon: {
      left: 15,
      top: 38,
      position: 'absolute',
      zIndex: 1,
    },
    rightIcon: {
      right: 15,
      top: 38,
      position: 'absolute',
      zIndex: 1,
    },
    button: {
      padding: 15,
      backgroundColor: brand,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginVertical: 5,
      height: 60,
    },
    googleButton: {
      backgroundColor: yellow,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginVertical: 5,
      height: 60,
    },
    buttonText: {
      color: primary,
      fontSize: 16,
      padding: 5,
    },
    googleButtonIcon: {
        marginRight: 5,
        color: '#fff',
      },
      googleButtonText: {
        color: '#fff', // Cor do texto desejada
        fontSize: 16,
      },
    msgBox: {
      textAlign: 'center',
      fontSize: 13,
    },
    successMsg: {
      color: green,
    },
    errorMsg: {
      color: red,
    },
    line: {
      height: 1,
      width: '100%',
      backgroundColor: darkLight,
      marginVertical: 10,
    },
    extraView: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
      paddingBottom: 0,
    },
    extraText: {
      justifyContent: 'center',
      alignContent: 'center',
      color: tertiary,
      fontSize: 15,
    },
    textLink: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    textLinkContent: {
      color: ligthblue,
      fontSize: 15,
    },
    container2: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
      },
      section2: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      paragraph2: {
        fontSize: 15,
      },
      checkbox2: {
        margin: 8,
      },
      mapContainer: {
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
  });
  
  export default styles;