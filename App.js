import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import InputSection from './components/InputSection';
import TodoSection from './components/TodoSection';
const App = () => {
  useEffect(async () => {
    try {
      const todoItems = await AsyncStorage.getItem('todoItems');
      if (todoItems) {
        setTodos(JSON.parse(todoItems).todoItems);
      }
    } catch (err) {
      Alert.alert('Error', 'something went wrong try to restart the app');
    }
  }, []);
  const [todos, setTodos] = useState([]);
  return (
    <>
      <View style={styles.todoApp}>
        <Header />
        <InputSection todos={todos} setTodos={setTodos} />
        <TodoSection todos={todos} setTodos={setTodos} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  todoApp: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
export default App;
