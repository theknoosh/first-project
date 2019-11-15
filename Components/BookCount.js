import React from "react";
import { View, Text } from "react-native";

export default class BookCount extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>{this.props.title}</Text>
        <Text>{this.props.count}</Text>
      </View>
    );
  }
}
