import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core'

const Img = ({ point }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Img', point)}
      style={styles.container}
    >
      <Image
        source={{ uri: point.imageUrl }}
        style={[
          styles.img,
          // point.available ? {opacity: 1} : {opacity: 0.5}
        ]}
      />
      <Text style={{ fontSize: 25 }}>{point.title}</Text>
    </TouchableOpacity>
  )
};

export default Img;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderColor: "grey",
    borderWidth: 7,
    borderRadius: 50,
  }
});
