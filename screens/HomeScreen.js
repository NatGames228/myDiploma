import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core'

import { auth } from '../utils/firebase'
import { getQuizzes, getDataByUidAndQuizId } from '../utils/database';

import { COLORS, IMAGES } from '../constants/theme';

const HomeScreen = () => {
  const navigation = useNavigation()

  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllQuizzes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizzes();

    quizzes.onSnapshot(async docs => {
      setAllQuizzes([]);
      console.log('change HomeScreen')
      const quizzesDocs = docs.docs;
      let tempQuizzes = [];

      for (quiz of quizzesDocs) {
        const userQuizzes = await getDataByUidAndQuizId(auth.currentUser?.uid, quiz.id);
        const userInfo = userQuizzes.data()
        await tempQuizzes.push({ id: quiz.id, userInfo, ...quiz.data() });
      }

      setAllQuizzes([...tempQuizzes]);
      setRefreshing(false);
    })
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <View
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
                source={{ uri: quiz.imageUrl ? quiz.imageUrl : IMAGES.noAvatar }}
                style={{ width: 60, height: 60, borderRadius: 30, marginRight: 20 }}
              />
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={{ fontSize: 18, color: COLORS.black }}>
                  {quiz.title}
                </Text>
                {
                  quiz.userInfo ? (
                    <Text style={{ opacity: 0.5 }}>
                      {quiz.userInfo.correctCount}/{quiz.userInfo.total}
                    </Text>
                  ) : null
                }
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
    </View>
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
