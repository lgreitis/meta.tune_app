import React, { useEffect } from 'react';
import { StyleSheet, View, Text, BackHandler, Dimensions, KeyboardAvoidingView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PlayerSection from '../components/playerSection'
import ChatSection from '../components/chatSection'



export default function Room({ route }) {
  const { room } = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" style={[styles.icon, styles.backIcon]} />
        <Text style={styles.headerText}>{room.roomName}</Text>
        <Ionicons name="menu-outline" style={[styles.icon, styles.menuIcon]} />
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
    height: screenHeight * 0.35,
  },
  chatContainer: {
    backgroundColor: '#44485b',
    flex: 1,
  },
});