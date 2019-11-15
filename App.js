import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import BookCount from "./Components/BookCount";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View
          style={{
            height: 75,
            borderBottomWidth: 0.5,
            borderBottomColor: "#cbcdcb",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 26 }}>Book Worm</Text>
        </View>

        {/* Body view */}
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            width: 100,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#3eaac6",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>+</Text>
        </View>
        <View
          style={{
            height: 75,
            borderTopWidth: 0.5,
            borderTopColor: "#cbcdcb",
            flexDirection: "row"
          }}
        >
          <BookCount title="Total" count={this.state.totalCount} />
          <BookCount title="Reading" count={this.state.readingCount} />
          <BookCount title="Read" count={this.state.readCount} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    flex: 1,
    backgroundColor: "red"
  }
});
