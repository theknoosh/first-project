import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";

import WelcomeScreen from "./Screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./Screens/HomeScreen";
import SignUpScreen from "./Screens/SignUpScreen";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";

const App = () => <AppContainer />;

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUpScreen
});

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  HomeScreen
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
