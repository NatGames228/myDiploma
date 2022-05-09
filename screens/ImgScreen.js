import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ScrollView, Text } from 'react-native';

import Map from './components/Map';

const ImgScreen = ({ route, navigation }) => {
  const logo = route.params;
  return (
    <ScrollView backgroundColor='#fff'>
      <Image 
      source={logo.source}
      style={styles.img}
     />
      <Text style={styles.text}>{logo.text}</Text>
    <Map />
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
