import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';

import Img from './components/Img';
import FormButton from './components/FormButton';

import { getQuizzes, getQuestionsByQuizId, getQuizById } from '../utils/database';

import { COLORS } from '../constants/theme';

const QuizScreen = ({ navigation, route }) => {
  const { title, id, description } = route.params;
  const [points, setPoints] = useState([]);

  navigation.setOptions({ title })

  const getQuizDetails = async () => {
    // Get Questions for current quiz
    const points = await getQuestionsByQuizId(id);

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
    getQuizDetails();
  }, []);

  // console.log(points)
  return (
    <ScrollView>
      <Image
        source={{ uri: 'https://img3.stcrm.it/images/22898928/2500x/annunciomymoto.jpeg' }}
        style={styles.img}
      />
      <View style={styles.container}>
        <Text>
          123
        </Text>
        {/* Points on the map */}
        {
          points.map(point => (
            <Img point={point} key={point.title} />
          ))
        }
        <View style={{ alignItems: 'center' }}>
          <FormButton
            labelText="start test"
            style={styles.btn}
            handleOnPress={() => {
              navigation.navigate('PlayQuizScreen', {
                quizId: id,
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.border,
    padding: 10,
    paddingTop: 0,
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  btn: {
    width: '30%',
    borderRadius: 30,
    marginBottom: 5,
  },
});

