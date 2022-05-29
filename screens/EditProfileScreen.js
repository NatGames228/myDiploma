import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

import FormInput from './components/FormInput';
import FormButton from './components/FormButton';

import { auth, storage } from '../utils/firebase'
import { createUser } from '../utils/database';

import { COLORS, IMAGES } from '../constants/theme'

const EditProfileScreen = ({ route, navigation }) => {
  navigation.setOptions({ title: 'Edit Profile' })
  const [user, setUser] = useState(route.params);
  const [imageUri, setImageUri] = useState(user.imageUrl)
  const [name, setName] = useState(user.name)


  const update = async () => {
    if (name == '') {
      ToastAndroid.show('input error', ToastAndroid.SHORT);
      return;
    }
    if (name == user.name && imageUri == user.imageUrl) { return; }

    let imageUrl = '';

    if (imageUri != '') {
      const responce = await fetch(imageUri);
      const blob = await responce.blob();

      const reference = storage.ref().child(
        `/images/users/${user.uid}`,
      );
      await reference.put(blob).then(() => {
        console.log('Image Uploaded');
      })
      imageUrl = await reference.getDownloadURL();
    }

    await createUser(auth.currentUser.uid, name, imageUri)
    ToastAndroid.show('success', ToastAndroid.SHORT);
    navigation.goBack()
  }

  const clear = () => {
    setName(user.name);
    setImageUri(user.imageUrl);
  }

  const selectImage = async () => {
    let result = await launchImageLibraryAsync(
      {
        mediaType: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      }
    );
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View
      style={styles.container}
      behavior="padding"
    >
      {/* Image */}
      <TouchableOpacity onPress={selectImage}
        style={{}}>
        <Image
          source={{
            uri:
              imageUri ? imageUri : IMAGES.noAvatar
          }}
          style={styles.img}
        />
      </TouchableOpacity>

      {/* Input */}
      <View style={styles.inputContainer}>
        <FormInput
          labelText="Your name"
          textColor='gray'
          onChangeText={val => setName(val)}
          value={name}
          style={styles.input}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <FormButton
          labelText="Cansel"
          style={{ width: '45%' }}
          isPrimary={false}
          handleOnPress={clear}
        />
        <FormButton
          labelText="Save"
          handleOnPress={update}
          style={{ width: '45%' }}
        />
      </View>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  inputContainer: {
    marginTop: 30,
    width: '80%',
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})