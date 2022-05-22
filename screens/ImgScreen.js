import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ScrollView, Text } from 'react-native';

import Map from './components/Map';

import { COLORS } from '../constants/theme';

const ImgScreen = ({ route, navigation }) => {
  const point = route.params;
  return (
    <ScrollView backgroundColor={COLORS.white}>
      <Image
        source={{ uri: point.imageUrl }}
        style={styles.img}
      />
      <Text style={styles.text}>{point.question}</Text>
      <Map point={point} />
    </ScrollView>

  )
};

export default ImgScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    margin: 5
  }
});
