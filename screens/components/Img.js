import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core'

const Img = ({ point }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ImgScreen', point)}
      style={styles.container}
    >
      <Image
        source={{ uri: point.imageUrl }}
        style={styles.img}
      />
      <Text style={{ fontSize: 22 }}>{point.title}</Text>
    </TouchableOpacity>
  )
};

export default Img;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 50,
  }
});
