import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function Login() {
  const[username, setUsername] = useState(
    {
      username: ""
    }
  );
  const[password, setPassword] = useState(
    {
      password: ""
    }
  );

  const changeHandlerUsername = (val) =>{
    setUsername(val);
  }
  const changeHandlerPassword = (val) =>{
    setPassword(val);
  }
  const getRooms = () =>
  {
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
  const submitHandler = () =>
  {
      let details = {
        'email': username,
        'password': password
      };

      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

    fetch('http://88.119.36.191:8888/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody


      }).then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        //console.log(response);
        // ...
      }).catch(error => {
        console.log(error);
      });     
      getRooms();       
  }

  return (
    <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss()}>
      <View style={styles.container}>
        <TextInput 
          styles={styles.textInput}
          placeholder='Username'
          onChangeText={changeHandlerUsername}
          placeholderTextColor='white'
          value={username}
          
        />

        <TextInput 
          styles={styles.textInput}
          placeholder='Password'
          onChangeText={changeHandlerPassword}
          placeholderTextColor='white'
          value={password}
          textContentType='password'
          secureTextEntry={false}

        />

        <Button 
          onPress={submitHandler} 
          title='Login'
          color='purple'
          />

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor:'#43485b',
    flex: 1,
    justifyContent: 'center',
  },
  textInput:{
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#ddd',
  },
});