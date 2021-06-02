import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Header = () => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.heading}>Todo List</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#9b59b6',
    paddingTop: 10.0,
    paddingBottom: 10.0,
    width: '100%',
    marginBottom: 30.0,
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20.0,
    fontWeight: 'bold',
  },
});
export default Header;
