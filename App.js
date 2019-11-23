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
import { createAppContainer, createSwitchNavigator } from "react-navigation";

const App = () => <AppContainer />;

const AppSwitchNavigator = createSwitchNavigator({
  WelcomeScreen
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
