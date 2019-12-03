import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class BooksReadScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BooksReadScreen</Text>
      </View>
    );
  }
}
export default BooksReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
