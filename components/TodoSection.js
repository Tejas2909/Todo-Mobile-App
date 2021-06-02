import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const TodoSection = ({todos, setTodos}) => {
  useEffect(async () => {
    const data = {
      todoItems: todos,
    };
    try {
      await AsyncStorage.setItem(
        'todoItemsLength',
        JSON.stringify(data.todoItems.length),
      );
      await AsyncStorage.setItem('todoItems', JSON.stringify(data));
    } catch (err) {
      Alert.alert('Error', 'something went wrong try to restart the app');
    }
  }, [todos]);
  const deleteTodo = id => {
    setTodos(prev => {
      return prev.filter(todo => {
        return todo.id !== id;
      });
    });
  };
  return (
    <>
      <ScrollView style={styles.todoSection}>
        {todos.map((todo, id) => {
          return (
            <View key={todo.id} style={styles.todoItem}>
              <View style={styles.todoTextView}>
                <Text style={styles.todoText}>{todo.todo}</Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteTodo(todo.id);
                  }}>
                  <Entypo
                    name="circle-with-cross"
                    color="firebrick"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  todoSection: {
    marginTop: 30,
    width: '80%',
    flex: 1,
    overflow: 'scroll',
  },
  todoItem: {
    width: '100%',
    backgroundColor: '#dfe6e9',
    padding: 15.0,
    borderRadius: 7,
    marginBottom: 15,
    elevation: 3,
  },
  todoText: {
    color: 'grey',
    fontSize: 15,
    maxWidth: '50%',
  },
  todoTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default TodoSection;
