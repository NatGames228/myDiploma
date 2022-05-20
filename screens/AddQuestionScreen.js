import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

import FormInput from './components/FormInput';
import FormButton from './components/FormButton';

import { createQuestion } from '../utils/database';
import { storage } from '../utils/firebase';

import { COLORS } from '../constants/theme';

const AddQuestionScreen = ({ navigation, route }) => {
  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId,
  );
  const [currentQuizTitle, setCurrentQuizTitle] = useState(
    route.params.currentQuizTitle,
  );

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [correctAnswer, setCorrectAnswer] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const isNum = (val) => (/^(0|[1-9]\d*)(\.[0-9]*)?$/.test(val))

  const handleQuestionSave = async () => {
    if (
      title == '' ||
      question == '' ||
      !isNum(latitude) ||
      !isNum(longitude) ||
      correctAnswer == '' ||
      optionTwo == '' ||
      optionThree == '' ||
      optionFour == ''
    ) {
      ToastAndroid.show('input error', ToastAndroid.SHORT);
      return;
    }

    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000,
    ).toString();

    // Upload Image
    let imageUrl = '';

    if (imageUri != '') {
      const responce = await fetch(imageUri);
      const blob = await responce.blob();

      const reference = storage.ref().child(
        `/images/questions/${currentQuizId}_${currentQuestionId}`,
      );
      await reference.put(blob).then(() => {
        console.log('Image Uploaded');
      })
      imageUrl = await reference.getDownloadURL();
    }

    // Add question to db
    await createQuestion(currentQuizId, currentQuestionId, {
      title: title,
      question: question,
      latitude: latitude,
      longitude: longitude,
      correct_answer: correctAnswer,
      incorrect_answers: [optionTwo, optionThree, optionFour],
      imageUrl: imageUrl,
    });
    ToastAndroid.show('Question saved', ToastAndroid.SHORT);

    // Reset
    setTitle('');
    setQuestion('');
    setLatitude('');
    setLongitude('');
    setCorrectAnswer('');
    setOptionTwo('');
    setOptionThree('');
    setOptionFour('');
    setImageUri('');
  };

  const selectImage = async () => {
    let result = await launchImageLibraryAsync(
      {
        mediaType: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }
    );
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View style={{ padding: 20 }}>
          <Text
            style={styles.addQuestion}>
            Add Question
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>
            For {currentQuizTitle}
          </Text>

          <FormInput
            labelText="Title"
            placeholderText="enter title"
            onChangeText={val => setTitle(val)}
            value={title}
          />

          <FormInput
            labelText="Question"
            placeholderText="enter question"
            onChangeText={val => setQuestion(val)}
            value={question}
          />

          {/* Image upload */}

          {imageUri == '' ? (
            <TouchableOpacity
              style={styles.addImage}
              onPress={selectImage}>
              <Text style={{ opacity: 0.5, color: COLORS.primary }}>
                + add image
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: imageUri,
              }}
              resizeMode={'cover'}
              style={styles.image}
            />
          )}

          {/* Options */}
          <View style={{ marginTop: 30 }}>
            <FormInput
              labelText="Latitude"
              onChangeText={val => setLatitude(val)}
              value={latitude}
            />
            <FormInput
              labelText="Longitude"
              onChangeText={val => setLongitude(val)}
              value={longitude}
            />
            <FormInput
              labelText="Correct Answer"
              onChangeText={val => setCorrectAnswer(val)}
              value={correctAnswer}
            />
            <FormInput
              labelText="Option 2"
              onChangeText={val => setOptionTwo(val)}
              value={optionTwo}
            />
            <FormInput
              labelText="Option 3"
              onChangeText={val => setOptionThree(val)}
              value={optionThree}
            />
            <FormInput
              labelText="Option 4"
              onChangeText={val => setOptionFour(val)}
              value={optionFour}
            />
          </View>
          <FormButton
            labelText="Save Question"
            handleOnPress={handleQuestionSave}
          />
          <FormButton
            labelText="Done & Go Home"
            isPrimary={false}
            handleOnPress={() => {
              setCurrentQuizId('');
              navigation.navigate('Home');
            }}
            style={{ marginVertical: 20 }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addQuestion: {
    fontSize: 20, textAlign: 'center', color: COLORS.black
  },
  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    backgroundColor: COLORS.primary + '20',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  }
})
