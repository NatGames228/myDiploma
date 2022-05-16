import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import ImgScreen from './screens/ImgScreen';
import MainContainer from './screens/MainContainer';
import AddQuestionScreen from './screens/AddQuestionScreen';
import PlayQuizScreen from './screens/PlayQuizScreen';

import { COLORS } from './constants/theme'

const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();

// firebases logs
LogBox.ignoreLogs([`Warning: Async Storage has been extracted from react-native core`]);
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        <NativeStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <NativeStack.Screen options={{ headerShown: false }} name="Main" component={MainContainer} />
        <Stack.Screen options={{ title: 'Go home' }} name="Img" component={ImgScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddQuestionScreen" component={AddQuestionScreen} />
        <Stack.Screen options={{ headerShown: false }} name="PlayQuizScreen" component={PlayQuizScreen} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
