import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from "react-native";

import BookCount from "./Components/BookCount";
import { Ionicons } from "@expo/vector-icons";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInputData: "",
      books: []
    };
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = book => {
    this.setState(
      (state, props) => ({
        books: [...state.books, book],
        totalCount: state.totalCount + 1,
        readingCount: state.readingCount + 1
      }),
      () => {
        console.log(this.state.books);
      }
    );
  };

  render() {
    return (
      // Full screen enclosing View
      <View style={styles.container}>
        <SafeAreaView />

        {/* Header View */}
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
        <View style={{ flex: 1 }}>
          {this.state.isAddNewBookVisible && (
            <View style={{ height: 50, flexDirection: "row" }}>
              <TextInput
                onChangeText={text => this.setState({ textInputData: text })}
                style={{ flex: 1, backgroundColor: "#d5d7d7", paddingLeft: 40 }}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
              />
              <TouchableOpacity
                onPress={() => this.addBook(this.state.textInputData)}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#1cb164",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Ionicons name="ios-checkmark" color="white" size={50} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.hideAddNewBook}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#e53966",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Ionicons name="ios-close" color="white" size={50} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Button View */}
          <TouchableOpacity
            onPress={this.showAddNewBook}
            style={{ position: "absolute", bottom: 20, right: 20 }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#3eaac6",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: 30 }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Footer View*/}
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
    backgroundColor: "white"
    // alignItems: "center"
  },
  box: {
    flex: 1,
    backgroundColor: "red"
  }
});
