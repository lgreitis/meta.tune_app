import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, BackHandler, Dimensions, KeyboardAvoidingView, Keyboard } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import PlayerSection from '../components/playerSection'
import ChatSection from '../components/chatSection'



export default function Room({ route, navigation }) {
  const { room } = route.params;
  const[isKeyboardOn, setIsKeyboardOn] = useState(false)
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);


    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    };
  }, []);

  const keyboardDidHide = () => {
    setIsKeyboardOn(false)
    console.log('b')
  }

  const keyboardDidShow = () => {
    setIsKeyboardOn(true)
    console.log('a')
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" style={[styles.icon, styles.backIcon]} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>{room.roomName}</Text>
        <MaterialIcons name="menu" style={[styles.icon, styles.menuIcon]} onPress={() => console.log('menu pressed')} />
      </View>

      <View style={[styles.playerContainer, isKeyboardOn ? {zIndex: 0}:{zIndex: 1}]}>
        <PlayerSection />
      </View>
      <View style={styles.chatContainer}>
        <ChatSection room={room} />
      </View>
    </KeyboardAvoidingView>
  );
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    height: screen.height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#474b53',
    alignItems: 'flex-end',
    paddingBottom: '2%',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
    fontSize: 30,
    position: 'absolute',
    top: '50%',
  },
  backIcon: {
    left: 16,
  },
  menuIcon: {
    right: 16,
  },
  playerContainer: {
    backgroundColor: '#33385b',
    flex: 1,
    maxHeight: screen.width / (16 / 9) + 50 + 45,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#44485b',
  },
});