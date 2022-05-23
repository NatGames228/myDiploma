import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core'

import { getQuizzes } from '../utils/database';

import { COLORS } from '../constants/theme';

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
          <>
            <View style={styles.item}>
              <Image
                source={{ uri: 'https://avatars.mds.yandex.net/i?id=151466b6e2052cdeed45a0ad67beebec-5869219-images-thumbs&ref=rim&n=33&w=225&h=225' }}
                style={{ width: 60, height: 60, borderRadius: 30, marginRight: 20 }}
              />
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
                onPress={() => { navigation.navigate('QuizScreen', quiz) }}
              >
                <Text style={{ color: COLORS.primary }}>Play</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </SafeAreaView>
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
