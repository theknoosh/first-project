import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomActionButton from "../Components/CustomActionsButton";
import colors from "../assets/colors";

class SettingsScreen extends Component {
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
          onPress={() => this.props.navigation.navigate("WelcomeScreen")}
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
