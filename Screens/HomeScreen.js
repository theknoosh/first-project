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

require("firebase/auth");
require("firebase/storage");
require("firebase/database");

import BookCount from "../Components/BookCount";
import CustomActionButton from "../Components/CustomActionsButton";
import { Ionicons } from "@expo/vector-icons";

import colors from "../assets/colors";
import * as firebase from "firebase/app";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInputData: "",
      books: [],
      booksReading: [],
      booksRead: []
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    const currentUserData = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    this.setState({ currentUser: currentUserData.val() });
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = async book => {
    try {
      // books
      // users UID
      // book id(key)
      // books data
      const snapshot = await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");

      if (snapshot.exists()) {
        alert("Unable to add as book already exists");
      } else {
        const key = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .push().key;
        const response = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .child(key)
          .set({ name: book, read: false });
        this.setState(
          (state, props) => ({
            books: [...state.books, book],
            booksReading: [...state.booksReading, book],
            // totalCount: state.totalCount + 1,
            // readingCount: state.readingCount + 1
            isAddNewBookVisible: false
          }),
          () => {
            console.log(this.state.books);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  markAsRead = (selectedBook, index) => {
    let books = this.state.books.filter(book => book !== selectedBook);
    let booksReading = this.state.booksReading.filter(
      book => book !== selectedBook
    );

    this.setState(prevState => ({
      books: books,
      booksReading: booksReading,
      booksRead: [...prevState.booksRead, selectedBook]
      // readingCount: prevState.readingCount - 1,
      // readCount: prevState.readCount + 1
    }));
  };

  renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>

      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
      </CustomActionButton>
    </View>
  );

  render() {
    return (
      // Full screen enclosing View
      <View style={styles.container}>
        <SafeAreaView />

        {/* Header View */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>

        {/* Body view */}
        <View style={styles.container}>
          {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({ textInputData: text })}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
              />

              {/* Button with checkmark */}
              <CustomActionButton
                style={styles.checkmarkButton}
                onPress={() => this.addBook(this.state.textInputData)}
              >
                <Ionicons name="ios-checkmark" color="white" size={50} />
              </CustomActionButton>

              {/* Close button */}
              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close" color="white" size={50} />
              </CustomActionButton>
            </View>
          )}

          <FlatList
            data={this.state.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.listEmptyComponent}>
                <Text style={styles.listEmptyComponentText}>
                  Not Reading Any Books
                </Text>
              </View>
            }
          />

          {/* Round Button */}
          <CustomActionButton
            position="right"
            style={styles.addNewBookButton}
            onPress={this.showAddNewBook}
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        </View>
        {/* Footer View*/}
        <View style={styles.footer}>
          <BookCount title="Total Books" count={this.state.books.length} />
          <BookCount title="Reading" count={this.state.booksReading.length} />
          <BookCount title="Read" count={this.state.booksRead.length} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

// export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    // alignItems: "center"
  },
  header: {
    height: 75,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    fontSize: 26
  },
  textInputContainer: {
    height: 50,
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 40
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center"
  },
  listEmptyComponentText: {
    fontWeight: "bold"
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25
  },
  addNewBookButtonText: {
    color: "white",
    fontSize: 30
  },
  footer: {
    height: 75,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: "row"
  },
  listItemContainer: {
    height: 50,
    flexDirection: "row"
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: colors.bgSuccess
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "white"
  }
});
