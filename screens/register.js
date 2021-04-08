import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput,
   TouchableWithoutFeedback, Keyboard, Touchable, 
   TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Button from '../components/button';
import FlashMessage from "react-native-flash-message";
import { alertContext } from '../context/alertContext';
import { authContext } from '../context/authContext';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { signUp } = React.useContext(authContext);

  const alert = React.useContext(alertContext);

  const validation = () =>
  {
    let userNameRegExp = /\W+/
    let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let passwordRegExp = /[^*.!@#$%^&(){}[\]:;<>,.?/~_+-=|a-zA-Z0-9]+/

    if(!username || !email || !password || !password2)
    {
      alert('Please enter all fields');
      return;
    }

    if(username.length < 5)
    {
      alert("Name should be at least 5 characters");
      return;
    }
    if(username.length > 32)
    {
      alert("Name should be no longer than 32 characters");
      return;
    }
    if(userNameRegExp.test(username))
    {
      alert("Name contains illegal characters");
      return;
    }

    if(!emailRegExp.test(email))
    {
      alert("Email is invalid");
      return;
    }

    if(password.length < 6)
    {
      alert("Password should be at least 6 characters long");
      return;
    }
    
    if(password.length > 32)
    {
      alert("Password should be no longer than 32 characters");
      return;
    }

    if(password != password2)
    {
      alert("Passwords don't match");
      return;
    }

    if(passwordRegExp.test(password))
    {
      alert("Password contains illegal characters");
      return;
    }

    console.log("validation passed");
    signUp({ email, username, password, password2 })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Image
            style={{ width: 250, height: 250, alignSelf: 'center', }}
            source={require('../Logo/Meta.Tunetransparent.png')}
          />
          <View style={styles.textInput}>
            <TextInput
              placeholder='Username'
              onChangeText={setUsername}
              placeholderTextColor='#6272a4'
              value={username}
              color='white'
              textContentType='username'
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder='E-mail'
              onChangeText={setEmail}
              placeholderTextColor='#6272a4'
              value={email}
              color='white'
              textContentType='emailAddress'
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder='Password'
              onChangeText={setPassword}
              placeholderTextColor='#6272a4'
              value={password}
              secureTextEntry={true}
              color='white'
              textContentType='password'
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder='Confirm password'
              onChangeText={setPassword2}
              placeholderTextColor='#6272a4'
              value={password2}
              secureTextEntry={true}
              color='white'
              textContentType='password'
            />
          </View>
          <Button
            onPress={validation}
            title='Sign Up'
            backgroundColor='#bd93f9'
          />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Have an account? Log in!</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </TouchableWithoutFeedback>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
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
    color: '#6272a4',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'center',
  },
});