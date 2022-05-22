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

import { getQuizzes, getQuestionsByQuizId, getQuizById } from '../utils/database';

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
            <View
              style={styles.item}
            >
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

            {/* Points on the map */}
            <Point currentQuizId={quiz.id} />
          </>
        )}
      />
    </SafeAreaView>
  )
}

const Point = ({ currentQuizId }) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState([]);

  const getQuizAndQuestionDetails = async () => {
    // Get Quiz
    let currentQuiz = await getQuizById(currentQuizId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);

    // Get Questions for current quiz
    const points = await getQuestionsByQuizId(currentQuizId);

    // Transform and shuffle options
    let tempQuestions = [];
    await points.docs.forEach(async res => {
      let question = res.data();

      // img question
      if (!question.imageUrl) {
        question.imageUrl = 'https://img3.stcrm.it/images/22898928/2500x/annunciomymoto.jpeg'
      }

      // Create Single array of all options and shuffle it
      question.allOptions = [
        ...question.incorrect_answers,
        question.correct_answer,
      ];
      await tempQuestions.push(question);
    });

    setPoints([...tempQuestions]);
  };

  useEffect(() => {
    getQuizAndQuestionDetails();
  }, []);

  return (
    <FlatList
      data={points}
      keyExtractor={item => item.question}
      renderItem={({ item, index }) => (
        <Img point={item} />
      )}
    />
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
