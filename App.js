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
import SettingsScreen from "./Screens/SettingsScreen";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Ionicons } from "@expo/vector-icons";
import CustomDrawerComponent from "./Screens/DrawerNavigator/CustomDrawerComponent";

const App = () => <AppContainer />;

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
      // headerBackTitle: null
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {}
  }
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />
      }
    }
  },
  {
    contentComponent: CustomDrawerComponent
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  AppDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
