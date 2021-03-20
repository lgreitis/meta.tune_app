import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback,
   Keyboard, Image, TouchableOpacity, StatusBar, KeyboardAvoidingView, } from 'react-native';
import { AuthContext } from "../App.js"
import Button from '../components/button';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = React.useContext(AuthContext);
  
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
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholderTextColor='#6272a4'
              value={password}
              textContentType='password'
              color='white'
            />
          </View>
          <Button
            onPress={() => signIn({ email, password })}
            title='Login'
            backgroundColor='#bd93f9'
          />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.text}>Don't have an account? Sign up now!</Text>
            </TouchableOpacity>
          </View>
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
  }
});