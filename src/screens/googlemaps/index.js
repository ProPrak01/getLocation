import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView,{Marker , PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function GoogleMapsScreen({ location }) {
  const { latitude, longitude } = location;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={"hello"}
          description={"nothing"}
        />
      </MapView>
    </View>
  );
}
