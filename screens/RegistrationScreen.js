import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

import { auth, storage } from '../utils/firebase'
import { createUser } from '../utils/database'

import { COLORS, IMAGES } from '../constants/theme'

const RegistrationScreen = () => {
  const [imageUri, setImageUri] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && name) {
        navigation.replace("Main")
      }
    })
    return unsubscribe
  }, [])

  const handleSingUp = () => {
    if (name == '') {
      ToastAndroid.show('input error', ToastAndroid.SHORT);
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

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

        await createUser(user.uid, name, imageUri, 'user')
        console.log('Registered with:', user.email);
        console.log('uid:', user.uid);
      })
      .catch(error => ToastAndroid.show(error.message, ToastAndroid.SHORT))
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      {/* Image */}
      <TouchableOpacity onPress={selectImage}>
        <Image
          source={{
            uri:
              imageUri ? imageUri : IMAGES.noAvatar
          }}
          style={styles.img}
        />
      </TouchableOpacity>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Full Name'
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSingUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>

      {/* Log in */}
      </View>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Don't have an account?
          <Text onPress={() => navigation.goBack()} style={styles.footerLink}> Log in</Text>
        </Text>
      </View>
    </KeyboardAvoidingView >
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
    margin: 30,
  },
  inputContainer: {
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: COLORS.white,
    marginTop: 5,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  footerView: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 15,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  footerLink: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16
  },
})
