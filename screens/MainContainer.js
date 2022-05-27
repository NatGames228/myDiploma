import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';
import CreateQuizScreen from './CreateQuizScreen';

//Screen names
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";
const createQuizName = "CreateQuiz";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === detailsName) {
            iconName = focused ? 'list' : 'list-outline';

          } else if (rn === createQuizName) {
            iconName = focused ? 'add-circle' : 'add-circle-outline';

          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';

          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    // tabBarOptions={{
    //   activeTintColor: 'tomato',
    //   inactiveTintColor: 'grey',
    //   labelStyle: { paddingBottom: 10, fontSize: 10 },
    //   style: { padding: 10, height: 70}
    // }}
    >

      <Tab.Screen options={{ headerShown: false }} name={homeName} component={HomeScreen} />
      <Tab.Screen options={{ headerShown: false }} name={detailsName} component={DetailsScreen} />
      <Tab.Screen options={{ headerShown: false }} name={createQuizName} component={CreateQuizScreen} />
      <Tab.Screen options={{ headerShown: false }} name={settingsName} component={SettingsScreen} />

    </Tab.Navigator>
  );
}

export default MainContainer;