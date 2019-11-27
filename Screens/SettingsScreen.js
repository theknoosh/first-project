import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomActionButton from "../Components/CustomActionsButton";
import colors from "../assets/colors";
import * as firebase from "firebase/app";
import "firebase/auth";

class SettingsScreen extends Component {
  signOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate("WelcomeScreen");
    } catch (error) {
      alert("unable to sign out right now.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomActionButton
          style={{
            width: 200,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: colors.bgError
          }}
          title="Logout"
          onPress={this.signOut}
        >
          <Text style={{ fontWeight: "300", color: "white" }}>Logout</Text>
        </CustomActionButton>
      </View>
    );
  }
}
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain
  }
});
