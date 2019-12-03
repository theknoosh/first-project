import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image
} from "react-native";

require("firebase/auth");
require("firebase/storage");
require("firebase/database");

import BookCount from "../Components/BookCount";
import CustomActionButton from "../Components/CustomActionsButton";
import { Ionicons } from "@expo/vector-icons";

import colors from "../assets/colors";
import * as firebase from "firebase/app";
import { snapshotToArray } from "../Helpers/firebaseHelpers";

import ListItem from "../Components/ListItem";
import * as Animatable from "react-native-animatable";

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
    this.textInputRef = null;
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    const currentUserData = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    const books = await firebase
      .database()
      .ref("books")
      .child(user.uid)
      .once("value");

    const booksArray = snapshotToArray(books);

    this.setState({
      currentUser: currentUserData.val(),
      books: booksArray,
      booksReading: booksArray.filter(book => !book.read),
      booksRead: booksArray.filter(book => book.read)
    });
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
    this.setState({ textInputData: "" });
    this.textInputRef.setNativeProps({ text: "" });
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
            books: [...state.books, { name: book, read: false }],
            booksReading: [...state.booksReading, { name: book, read: false }],
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

  markAsRead = async (selectedBook, index) => {
    try {
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });
      let books = this.state.books.map(book => {
        if (book.name == selectedBook.name) {
          return { ...book, read: true };
        }
        return book;
      });
      let booksReading = this.state.booksReading.filter(
        book => book.name !== selectedBook.name
      );

      this.setState(prevState => ({
        books: books,
        booksReading: booksReading,
        booksRead: [
          ...prevState.booksRead,
          { name: selectedBook.name, read: true }
        ]
        // readingCount: prevState.readingCount - 1,
        // readCount: prevState.readCount + 1
      }));
    } catch (error) {
      console.log(error);
    }
  };

  renderItem = (item, index) => (
    <ListItem item={item}>
      {item.read ? (
        <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
      ) : (
        <CustomActionButton
          style={styles.markAsReadButton}
          onPress={() => this.markAsRead(item, index)}
        >
          <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
        </CustomActionButton>
      )}
    </ListItem>
    // <View style={styles.listItemContainer}>
    //   <View style={styles.imageContainer}>
    //     <Image source={require("../assets/icon.png")} style={styles.image} />
    //   </View>
    //   <View style={styles.listItemTitleContainer}>
    //     <Text style={styles.listItemTitle}>{item.name}</Text>
    //   </View>

    // </View>
  );

  render() {
    return (
      // Full screen enclosing View
      <View style={styles.container}>
        <SafeAreaView />

        {/*<View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>*/}

        {/* Body view */}
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ textInputData: text })}
              placeholder="Enter Book Name"
              placeholderTextColor={colors.txtPlaceholder}
              ref={component => {
                this.textInputRef = component;
              }}
            />
          </View>
          {/*this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({ textInputData: text })}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
              />

              {/* Button with checkmark}
              <CustomActionButton
                style={styles.checkmarkButton}
                onPress={() => this.addBook(this.state.textInputData)}
              >
                <Ionicons name="ios-checkmark" color="white" size={50} />
              </CustomActionButton>

              {/* Close button}
              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close" color="white" size={50} />
              </CustomActionButton>
            </View>
          )*/}

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

          <Animatable.View
            animation={
              this.state.textInputData.length > 0
                ? "slideInRight"
                : "slideOutRight"
            }
          >
            <CustomActionButton
              position="right"
              style={styles.addNewBookButton}
              onPress={() => this.addBook(this.state.textInputData)}
            >
              <Text style={styles.addNewBookButtonText}>+</Text>
            </CustomActionButton>
          </Animatable.View>
        </View>

        {/* <View style={styles.footer}>
          <BookCount title="Total Books" count={this.state.books.length} />
          <BookCount title="Reading" count={this.state.booksReading.length} />
          <BookCount title="Read" count={this.state.booksRead.length} />
        </View> */}

        <SafeAreaView />
      </View>
    );
  }
}

// export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
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
    flexDirection: "row",
    margin: 5
  },
  textInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: 40,
    borderColor: colors.listItemBG,
    borderBottomWidth: 5,
    fontSize: 22,
    fontWeight: "200",
    color: colors.txtWhite
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
    minHeight: 100,
    flexDirection: "row",
    backgroundColor: colors.listItemBG,
    alignItems: "center",
    marginVertical: 5
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  listItemTitle: {
    fontWeight: "200",
    fontSize: 22,
    color: colors.txtWhite
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
