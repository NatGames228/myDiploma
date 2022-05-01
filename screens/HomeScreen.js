import React from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text } from 'react-native';

const logo = {
  uri: 'https://www.culture.ru/storage/images/4ed2740a-90c7-58d1-a244-092f28e7b7ac',
  // width: 64,
  // height: 64,

};

const HomeScreen = () => (
  <ScrollView backgroundColor='#fff'>
    <TouchableOpacity 
      onPress={() => alert('This is the "Home" screen.')}
      style={styles.container}
      >
        <Image 
        source={logo}
        style={styles.img}
        // tintColor='grey'
        // opacity= '.5'

      />
    </TouchableOpacity>
    <TouchableOpacity 
      onPress={() => alert('This is the "Home" screen.')}
      style={styles.container}
      >
        <Image 
        source={logo}
        style={styles.img}
      />
    </TouchableOpacity>
    <TouchableOpacity 
      onPress={() => alert('This is the "Home" screen.')}
      style={styles.container}
      >
        <Image 
        source={logo}
        style={styles.img}
      />
    </TouchableOpacity>

    <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>If you like</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>Scrolling down</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>What's the best</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 96 }}>Framework around?</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{ fontSize: 80 }}>React Native</Text>
  </ScrollView>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  img: {
    width: 64,
    height: 64,
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 50,
    // opacity: 0.3
    
  }
});
