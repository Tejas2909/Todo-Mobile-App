import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const InputSection = ({todos, setTodos}) => {
  const [id, setId] = useState(-1);
  const [todo, setTodo] = useState('');
  useEffect(async () => {
    try {
      const todoItemsLength = await AsyncStorage.getItem('todoItemsLength');
      if (todoItemsLength) {
        setId(JSON.parse(todoItemsLength) - 1);
      }
    } catch (err) {
      Alert.alert('Error', 'something went wrong try to restart the app');
    }
  }, []);
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
  const onInputChange = todo => {
    setTodo(todo);
  };
  useEffect(() => {
    setId(id + 1);
  }, [todos]);
  const addTodo = () => {
    if (todo === '') {
      console.log('empty');
      Alert.alert('Error', "Can't add an empty Item in the List");
    } else {
      setTodos([{id: id, todo: todo}, ...todos]);
    }
    setTodo('');
  };
  return (
    <>
      <View style={styles.inputSection}>
        <TextInput
          value={todo}
          onChangeText={onInputChange}
          placeholder="Enter your Todo"
          style={styles.input}
        />
        <TouchableOpacity onPress={addTodo} style={styles.buttonOutlook}>
          <Text style={styles.buttonText}>
            <AntDesign style={styles.icons} size={20} name="pluscircle" />
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    borderColor: '#bdc3c7',
    height: 40.0,
    borderWidth: 1.0,
    margin: 30.0,
    width: '100%',
    borderRadius: 7,
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 17,
  },
  buttonOutlook: {
    backgroundColor: '#9b59b6',
    width: '100%',
    borderRadius: 7,
  },
  icons: {
    color: 'white',
  },
});
export default InputSection;
