/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState,useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import GetLocation, { Location } from 'react-native-get-location';
import GoogleMapsScreen from './src/screens/googlemaps';

function App(): React.JSX.Element {
  const [permissionGranter,setPermissionGranter] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getLocationPermissionFxn();
  },[])
  async function getLocationPermissionFxn() {
    if(Platform.OS == "android"){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'Allow location permission please',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('You can use the location');
          setPermissionGranter(true);
          getCurrentLocation();
        } else {
          console.log('location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }

    }
  }
  async function getCurrentLocation() {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      setCurrentLocation(location);
      console.log("My current location -> ", location);
      setLoading(false);

    } catch (error) {
      
      console.warn("error");
    }
  }
 
  if(!permissionGranter){
    return <View><Text>Allow location Permission first !!</Text></View>
  }

  return loading ? <View><Text>Loading...</Text></View> : <GoogleMapsScreen location={currentLocation} />;

}


export default App;
