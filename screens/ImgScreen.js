import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';


const ImgScreen = ({logo}) => (
  <TouchableOpacity 
    onPress={() => alert('This is the "Home" screen.')}
    style={styles.container}
  >
    <Image 
    source={logo.source}
    style={[styles.img, logo.available ? {opacity: 1} : {opacity: 0.5}]}
  />
    <Text style={{ fontSize: 25 }}>{logo.name}</Text>
  </TouchableOpacity>
);

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
    width: 100,
    height: 100,
    borderColor: "grey",
    borderWidth: 7,
    borderRadius: 50,
  }
});
