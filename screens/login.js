import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, TouchableOpacity } from 'react-native';
import Button from '../components/button';

export default function Login() {
  const [username, setUsername] = useState(
    {
      username: ""
    }
  );
  const [password, setPassword] = useState(
    {
      password: ""
    }
  );

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
  const submitHandler = () => {
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          style={{width: 250, height: 250, alignSelf: 'center', }}
          source={require('../Logo/Meta.Tunetransparent.png')}
          />
        <View style={styles.textInput}>
          <TextInput
            placeholder='E-mail'
            onChangeText={changeHandlerUsername}
            placeholderTextColor='#6272a4'
            value={username}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder='Password'
            onChangeText={changeHandlerPassword}
            placeholderTextColor='#6272a4'
            value={password}
            textContentType='password'
            secureTextEntry={false}
          />
        </View>
        <Button
          onPress={submitHandler}
          title='Login'
          backgroundColor='#bd93f9'
        />
        <View>
          <TouchableOpacity>
          <Text style={styles.text}>Don't have an account? Sign up now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#282a36',
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#44475a',
    marginBottom: 10,
    marginHorizontal: 10, 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },

  text: {
    color:'#6272a4',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'center',
  }
});