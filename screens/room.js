import React, { useEffect } from 'react';
import { StyleSheet, View, Text, BackHandler, Dimensions, KeyboardAvoidingView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import PlayerSection from '../components/playerSection'
import ChatSection from '../components/chatSection'



export default function Room({ route, navigation }) {
  const { room } = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" style={[styles.icon, styles.backIcon]} onPress={() => navigation.goBack()}/>
        <Text style={styles.headerText}>{room.roomName}</Text>
        <MaterialIcons name="menu" style={[styles.icon, styles.menuIcon]} onPress={() => console.log('menu pressed')} />
      </View>

      <View style={styles.playerContainer}>
        <PlayerSection />
      </View>
      <View style={styles.chatContainer}>
        <ChatSection room={room} />
      </View>
    </KeyboardAvoidingView>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: screenHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#43485b',
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
    flex: 0,
    height: screenHeight * 0.42,
  },
  chatContainer: {
    backgroundColor: '#44485b',
    flex: 1,
  },
});