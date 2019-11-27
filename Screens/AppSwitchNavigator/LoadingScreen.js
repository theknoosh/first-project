import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import colors from "../../assets/colors";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    this.unsubscibe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Navigate to home screen
        this.props.navigation.navigate("HomeScreen", { user });
      } else {
        // Navigate to Login Screen
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };
  componentWillUnmount = () => {
    this.unsubscibe();
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain
  }
});
