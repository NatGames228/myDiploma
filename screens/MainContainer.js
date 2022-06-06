import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../constants/theme';

import { auth } from '../utils/firebase'
import { getUserById } from '../utils/database';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';
import CreateQuizScreen from './CreateQuizScreen';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  const [user, setUser] = useState({})

  const getUserInfo = async () => {
    console.log('change MainContainer')
    const userInfo = await getUserById(auth.currentUser?.uid);
    userInfo.onSnapshot(data => {
      const userData = data.data();
      setUser(userData)
    })
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Home') {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === 'Details') {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === 'CreateQuiz') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';

          } else if (rn === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';

          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >

      <Tab.Screen options={{ title: 'Главная', headerShown: false, screenOptions: COLORS.primary }} name={'Home'} component={HomeScreen} />
      <Tab.Screen options={{ title: 'Рейтинг', headerShown: false, screenOptions: COLORS.primary }} name={'Details'} component={DetailsScreen} />
      {
        user?.role == 'admin' ?
          <Tab.Screen options={{ title: 'Добавить', headerShown: false, screenOptions: COLORS.primary }} name={'CreateQuiz'} component={CreateQuizScreen} />
          : null
      }
      <Tab.Screen options={{ title: 'Настройки', headerShown: false, screenOptions: COLORS.primary }} name={'Settings'} component={SettingsScreen} />

    </Tab.Navigator>
  );
}

export default MainContainer;
