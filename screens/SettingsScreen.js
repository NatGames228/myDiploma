import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { auth } from '../utils/firebase'
import { getUserById, } from '../utils/database';

import { COLORS, IMAGES, SIZES } from '../constants/theme'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const SettingsScreen = () => {
  const [user, setUser] = useState({})

  const navigation = useNavigation()

  const getUserInfo = async () => {
    const email = auth.currentUser?.email;
    const userInfo = await getUserById(auth.currentUser?.uid);
    const userData = userInfo.data();
    userData['email'] = email;
    setUser(userData)
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: IMAGES.noAvatar }}
          style={styles.img}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={{ color: COLORS.white, opacity: 0.7 }}>
          ID: {user.uid}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <Option iconName='person' text='Profile' cb={handleSignOut} arrow={true} />
        <Option iconName='mail' text='Email address' cb={handleSignOut} arrow={true} />
        <Option iconName='lock-open' text='Password' cb={handleSignOut} arrow={true} />
        <Option iconName='log-out' text='Sign out' cb={handleSignOut} />
      </View>
    </ScrollView>
  )
}

export default SettingsScreen

const Option = ({ iconName, text, cb, arrow }) => (
  <TouchableOpacity
    onPress={cb}
    style={styles.option}
  >
    <Ionicons name={iconName} style={{
      fontSize: 25,
      color: COLORS.black,
      padding: 10,
      backgroundColor: '#53A7FB',
      borderRadius: 15,
      color: COLORS.white,
    }} />
    <Text style={styles.buttonText}>{text}</Text>
    {
      arrow ?
        <Ionicons name='arrow-forward' />
        : null
    }
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  imgContainer: {
    width: SIZES.width,
    height: SIZES.width * 2.5 / 4,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    elevation: 2,
  },
  name: {
    color: COLORS.white,
    fontSize: 25,
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  option: {
    padding: 7,
    width: '100%',
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    elevation: 2,
  },
  buttonText: {
    flex: 1,
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16,
    margin: 20,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 30,
  },
})