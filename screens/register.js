import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from "../App.js"
import Button from '../components/button';
import FlashMessage from "react-native-flash-message";

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { signUp } = React.useContext(AuthContext);

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
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder='E-mail'
              onChangeText={setEmail}
              placeholderTextColor='#6272a4'
              value={email}
              color='white'
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
            />
          </View>
          <Button
            onPress={() => signUp({ email, username, password, password2 })}
            title='Sign Up'
            backgroundColor='#bd93f9'
          />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Have an account? Log in!</Text>
            </TouchableOpacity>
          </View>
          <FlashMessage position="top" />
        </View>
      </TouchableWithoutFeedback>
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