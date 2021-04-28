import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableWithoutFeedback,
  Keyboard, Image, TouchableOpacity, StatusBar, KeyboardAvoidingView,
} from 'react-native';
import Button from '../components/button';
import { authContext } from '../context/AuthContext';
import { alertContext } from '../context/alertContext';
import { LinearGradient } from 'expo-linear-gradient';


export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = React.useContext(authContext);
  const alert = React.useContext(alertContext);

  const validation = () => {
    if (!email || !password) {
      alert("Please fill out all fields")
      return;
    }
    signIn({ email, password })
  }
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={styles.contentContainer}>

          <View style={styles.imageContainer}>
            <Image
              style={{ width: 250, height: 200, alignSelf: 'center', }}
              source={require('../Logo/Meta.Tunetransparent.png')}
            />
          </View>
          <View style={styles.formContainer}>
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
                secureTextEntry={true}
                onChangeText={setPassword}
                placeholderTextColor='#7d8bb5'
                value={password}
                textContentType='password'
                color='white'
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={validation}>
              <LinearGradient
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                colors={['#67ecff', '#bd93f9', '#ff6ec9']}
                style={styles.buttonGradient} />
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.text}>Don't have an account? Sign up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: '#282a36',
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    // backgroundColor: '#282a36',
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
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

  text: {
    color: '#8e9abe',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'center',

  },
  formContainer: {
    backgroundColor: '#282a36',
    paddingTop: 10,
    paddingHorizontal: 40,
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