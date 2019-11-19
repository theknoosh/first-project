import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
const BookCount = ({ title, count }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ fontSize: 20 }}>{count}</Text>
    <Text>{title}</Text>
  </View>
);

BookCount.propTypes = {
  count: PropTypes.number,
  title: PropTypes.string
};

BookCount.defaultProps = {
  title: "Title"
};

export default BookCount;
