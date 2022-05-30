import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native'

import FormInput from './components/FormInput';
import FormButton from './components/FormButton';

import { auth } from '../utils/firebase'

import { COLORS } from '../constants/theme'

const ChangeDataScreen = ({ navigation }) => {
  navigation.setOptions({ title: 'Change Password' })
  const [user, setUser] = useState(auth.currentUser);
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const update = () => {
    if (
      newPassword == '' ||
      confirmPassword == ''
    ) {
      ToastAndroid.show('input error', ToastAndroid.SHORT);
      return;
    }
    if (newPassword != confirmPassword) {
      ToastAndroid.show('passwords do not match', ToastAndroid.SHORT);
      return;
    }

    user
      .updatePassword(newPassword)
      .then(() => {
        ToastAndroid.show('success', ToastAndroid.SHORT);
        navigation.goBack()
      })
      .catch(error => {
        console.log(error.message)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      })
  }

  const clear = () => {
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <View
      style={styles.container}
      behavior="padding"
    >

      {/* Input */}
      <View style={styles.inputContainer}>
        <FormInput
          labelText="New Password"
          textColor='gray'
          onChangeText={val => setNewPassword(val)}
          value={newPassword}
          style={styles.input}
          secureTextEntry
        />
        <FormInput
          labelText="Confirm New Password"
          textColor='gray'
          onChangeText={val => setConfirmPassword(val)}
          value={confirmPassword}
          style={styles.input}
          secureTextEntry
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

export default ChangeDataScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
