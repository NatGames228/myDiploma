import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  VirtualizedLists
} from 'react-native';
import { useNavigation } from '@react-navigation/core'

import FormButton from './components/FormButton';
import Img from './components/Img';

import { getQuizzes } from '../utils/database';

import { COLORS } from '../constants/theme';

const logo = {
  source: { uri: 'https://www.culture.ru/storage/images/4ed2740a-90c7-58d1-a244-092f28e7b7ac' },
  name: 'Kul Sharif',
  text: 'The Kul Sharif Mosque located in Kazan Kremlin, was reputed to be – at the time of its construction – one of the largest mosques in Russia, and in Europe outside of Istanbul.',
  available: true
};

const HomeScreen = () => {
  const navigation = useNavigation()

  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllQuizzes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizzes();

    // Transform quiz data
    let tempQuizzes = [];
    await quizzes.docs.forEach(async quiz => {
      await tempQuizzes.push({ id: quiz.id, ...quiz.data() });
    });
    await setAllQuizzes([...tempQuizzes]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);
  return (

    // <ScrollView backgroundColor={COLORS.white}>

    <SafeAreaView
      style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      {/* Quiz list */}
      <FlatList
        data={allQuizzes}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: 20 }}
        renderItem={({ item: quiz }) => (
          <View
            style={styles.item}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontSize: 18, color: COLORS.black }}>
                {quiz.title}
              </Text>
              {quiz.description != '' ? (
                <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                navigation.navigate('PlayQuizScreen', {
                  quizId: quiz.id,
                });
              }}>
              <Text style={{ color: COLORS.primary }}>Play</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>

    /* <Img logo={logo}/>
    <Img logo={logo}/>
    <Img logo={logo}/>
    <Img logo={logo}/>
    <Img logo={logo}/>
    <Img logo={logo}/>

  </ScrollView> */
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  item: {
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  touchableOpacity: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    backgroundColor: COLORS.primary + '20',
  }
});
