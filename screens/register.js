import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, TextInput,
  TouchableWithoutFeedback, Keyboard, Touchable,
  TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import Button from '../components/button';
import FlashMessage from "react-native-flash-message";
import { alertContext } from '../context/alertContext';
import { authContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { signUp } = React.useContext(authContext);

  const alert = React.useContext(alertContext);

  const validation = () => {
    let userNameRegExp = /\W+/
    let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let passwordRegExp = /[^*.!@#$%^&(){}[\]:;<>,.?/~_+-=|a-zA-Z0-9]+/

    if (!username || !email || !password || !password2) {
      alert('Please enter all fields');
      return;
    }

    if (username.length < 5) {
      alert("Name should be at least 5 characters");
      return;
    }
    if (username.length > 32) {
      alert("Name should be no longer than 32 characters");
      return;
    }
    if (userNameRegExp.test(username)) {
      alert("Name contains illegal characters");
      return;
    }

    if (!emailRegExp.test(email)) {
      alert("Email is invalid");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }

    if (password.length > 32) {
      alert("Password should be no longer than 32 characters");
      return;
    }

    if (password != password2) {
      alert("Passwords don't match");
      return;
    }

    if (passwordRegExp.test(password)) {
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
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 250, height: 200, alignSelf: 'center', }}
              source={require('../Logo/Meta.Tunetransparent.png')}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.textInput}>
              <TextInput
                placeholder='Username'
                onChangeText={setUsername}
                placeholderTextColor='#7d8bb5'
                value={username}
                color='white'
                textContentType='username'
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                placeholder='E-mail'
                onChangeText={setEmail}
                placeholderTextColor='#7d8bb5'
                value={email}
                color='white'
                textContentType='emailAddress'
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                placeholder='Password'
                onChangeText={setPassword}
                placeholderTextColor='#7d8bb5'
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
                placeholderTextColor='#7d8bb5'
                value={password2}
                secureTextEntry={true}
                color='white'
                textContentType='password'
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={validation}>
              <LinearGradient
                colors={['#ff6ec9', '#bd93f9', '#67ecff',]}
                style={styles.buttonGradient}
              />
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={{marginTop: 12}}onPress={() => navigation.navigate("Login")}>
                <Text style={styles.text}>Have an account? Log in!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#282a36',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    backgroundColor: '#44475a',
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    height: 38,
    justifyContent: 'center'
  },
  imageContainer: {
    flexShrink: 1,
  },
  formContainer: {
    backgroundColor: '#282a36',
    paddingTop: 10,
  },
  text: {
    color: '#8e9abe',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 21,
    fontWeight: 'bold'
  },
  button: {
    // backgroundColor: '#bd93f9',
    marginHorizontal: 10,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center'
  },
  buttonGradient: {
    // backgroundColor: '#bd93f9',
    // marginHorizontal: 10,
    height: 50,
    marginBottom: -40,
    borderRadius: 25,
    // justifyContent: 'center'
    alignItems: 'center'
  }
});