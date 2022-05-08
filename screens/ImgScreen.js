import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const ImgScreen = ({ route, navigation }) => {
  const logo = route.params;
  return (
    <Text>{logo.name}</Text>
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
    width: 100,
    height: 100,
    borderColor: "grey",
    borderWidth: 7,
    borderRadius: 50,
  }
});
