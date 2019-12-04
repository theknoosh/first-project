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
import LoginScreen from "./Screens/LoginScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import LoadingScreen from "./Screens/AppSwitchNavigator/LoadingScreen";
import BooksReadingScreen from "./Screens/HomeTabNavigator/BooksReadingScreen";
import BooksReadScreen from "./Screens/HomeTabNavigator/BooksReadScreen";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Ionicons } from "@expo/vector-icons";
import CustomDrawerComponent from "./Screens/DrawerNavigator/CustomDrawerComponent";
import colors from "./assets/colors";

import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  render() {
    return <AppContainer />;
  }
}
// const App = () => <AppContainer />;

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null
        // headerBackTitle: null
      }
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {}
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      }
    }
  }
);

const HomeTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Total Books"
      }
    },
    BooksReadingScreen: {
      screen: BooksReadingScreen,
      navigationOptions: {
        tabBarLabel: "Books Reading"
      }
    },
    BooksReadScreen: {
      screen: BooksReadScreen,
      navigationOptions: {
        tabBarLabel: "Books Read"
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.bgMain
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput
    }
  }
);

HomeTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case "HomeScreen":
      return {
        headerTitle: "Total Books"
      };
    case "BooksReadScreen":
      return {
        headerTitle: "Books Read"
      };
    case "BooksReadingScreen":
      return {
        headerTitle: "Books Reading"
      };
    default:
      return {
        headerTitle: "Book Worm"
      };
  }
};

const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: {
      screen: HomeTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Ionicons
              name="ios-menu"
              size={40}
              color={colors.logoColor}
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 20 }}
            />
          )
        };
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      },
      headerTintColor: colors.txtWhite
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />
      }
    },
    // HomeScreen: {
    //   screen: HomeScreen,
    //   navigationOptions: {
    //     title: "Home",
    //     drawerIcon: () => <Ionicons name="ios-home" size={24} />
    //   }
    // },
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
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
