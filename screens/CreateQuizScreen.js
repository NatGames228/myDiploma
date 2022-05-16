import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, ToastAndroid } from 'react-native';

import FormInput from './components/FormInput';
import FormButton from './components/FormButton';

import { createQuiz } from '../utils/database';

import { COLORS } from '../constants/theme';

const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleQuizSave = async () => {
    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    // Save to firestore
    await createQuiz(currentQuizId, title, description);

    // Navigate to Add Question string
    navigation.navigate('AddQuestionScreen', {
      currentQuizId: currentQuizId,
      currentQuisTitle: title,
    });

    // Reset
    setTitle('');
    setDescription('');
    ToastAndroid.show('Quiz Saved', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView
      style={styles.container}>
      <Text
        style={styles.createQuiz}>
        Create Quiz
      </Text>

      <FormInput
        labelText="Title"
        placeholderText="enter quiz title"
        onChangeText={val => setTitle(val)}
        value={title}
      />
      <FormInput
        labelText="Description"
        placeholderText="enter quiz description"
        onChangeText={val => setDescription(val)}
        value={description}
      />

      <FormButton labelText="Save Quiz" handleOnPress={handleQuizSave} />

      {/* Temporary button - navigate without saving quiz */}
      <FormButton
        labelText="Navigate to AddQuestionScreen"
        style={{ marginVertical: 20 }}
        handleOnPress={() => {
          navigation.navigate('AddQuestionScreen', {
            currentQuizId: '123456',
            currentQuizTitle: 'Test title',
          });
        }}
      />
    </SafeAreaView>
  );
};

export default CreateQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  createQuiz: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  }
})
