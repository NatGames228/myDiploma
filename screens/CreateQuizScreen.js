import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

import FormInput from './components/FormInput';
import FormButton from './components/FormButton';

import { createQuiz } from '../utils/database';
import { storage } from '../utils/firebase';

import { COLORS } from '../constants/theme';

const CreateQuizScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleQuizSave = async () => {
    if (title == '' || description == '') {
      ToastAndroid.show('input error', ToastAndroid.SHORT);
      return;
    }
    if (isDisabled) { return; }
    setIsDisabled(true)

    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    // Save to firestore

    // Upload Image
    let imageUrl = '';

    if (imageUri != '') {
      const responce = await fetch(imageUri);
      const blob = await responce.blob();

      const reference = storage.ref().child(
        `/images/questions/${currentQuizId}`,
      );
      await reference.put(blob).then(() => {
        console.log('Image Uploaded');
      })
      imageUrl = await reference.getDownloadURL();
    }

    await createQuiz(currentQuizId, title, description, imageUrl);
    clear();
    ToastAndroid.show('Quiz Saved', ToastAndroid.SHORT);

    setIsDisabled(false)
    navigation.navigate('AddQuestionScreen', {
      currentQuizId: currentQuizId,
      currentQuisTitle: title,
    });
  };

  const clear = () => {
    setTitle('');
    setDescription('');
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
    <ScrollView style={styles.container}>
      <Text
        style={styles.createQuiz}>
        Create Quiz
      </Text>

      <FormInput
        labelText="Title"
        onChangeText={val => setTitle(val)}
        value={title}
      />
      <FormInput
        labelText="Description"
        onChangeText={val => setDescription(val)}
        value={description}
        multiline
        numberOfLines={4}
      />

      {/* Image upload */}
      {
        imageUri == '' ? (
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
        )
      }

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <FormButton
          labelText="Calsel"
          style={{ width: '45%' }}
          isPrimary={false}
          handleOnPress={clear}
        />
        <FormButton
          labelText="Save Quiz"
          handleOnPress={handleQuizSave}
          style={{ width: '45%' }}
        />
      </View>

    </ScrollView>
  );
};

export default CreateQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  createQuiz: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    backgroundColor: COLORS.primary + '20',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
