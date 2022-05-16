import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Img from './components/Img';

import { COLORS } from '../constants/theme';

const logo = {
  source: { uri: 'https://www.culture.ru/storage/images/4ed2740a-90c7-58d1-a244-092f28e7b7ac' },
  name: 'Kul Sharif',
  text: 'The Kul Sharif Mosque located in Kazan Kremlin, was reputed to be – at the time of its construction – one of the largest mosques in Russia, and in Europe outside of Istanbul.',
  available: true
};

const HomeScreen = () => {
  return (

    <ScrollView backgroundColor={COLORS.white}>
      <Img logo={logo} />
      <Img logo={logo} />
      <Img logo={logo} />
      <Img logo={logo} />
      <Img logo={logo} />
      <Img logo={logo} />
    </ScrollView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
