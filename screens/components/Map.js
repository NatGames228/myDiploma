import * as React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { COLORS } from '../../constants/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 55.7983486,
          // latitude: 55.7823547,
          longitude: 49.1051597,
          // longitude: 49.1242266,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        <Marker
          coordinate={{ latitude: 55.79840099276407, longitude: 49.10550120304926 }}
          // image={{uri: 'custom_pin'}}
          pinColor="blue"
        >
          <Callout>
            <Text>Kul Sharif</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 100 * 83,
  },
});
