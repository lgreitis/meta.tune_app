import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AuthContext } from "../App.js"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = React.useContext(AuthContext);

  /*
  const changeHandlerUsername = (val) => {
    setUsername(val);
  }

  const changeHandlerPassword = (val) => {
    setPassword(val);
  }
  

  const getRooms = () => {
    fetch('http://88.119.36.191:8888/api/rooms',
      {
        method: 'GET'

      }).then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        console.log(response);
        // ...
      }).catch(error => {
        console.log(error);
      });
  }
  */

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput
          styles={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          styles={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" color='purple' onPress={() => signIn({ email, password })} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#43485b',
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#ddd',
  },
});