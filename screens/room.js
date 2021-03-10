import React, { useEffect } from 'react';
import { StyleSheet, View, Text, BackHandler, Dimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PlayerSection from '../components/playerSection'
import ChatSection from '../components/chatSection'



export default function Room({ route }) {
  const { room } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" style={[styles.icon, styles.backIcon]} />
        <Text style={styles.headerText}>{room.roomName}</Text>
        <Ionicons name="menu-outline" style={[styles.icon,styles.menuIcon]} />
      </View>

      <View style={styles.playerContainer}>
        <PlayerSection />
      </View>
      <View style={styles.chatContainer}>
        <ChatSection room={room}/>
      </View>


    </View>
    /*
    <View style={styles.container}>
      <Text>{room.roomName}</Text>
      <Text>{room.slug}</Text>
      <Text>{room.url}</Text>
      <Text>{room.desc}</Text>
      <Text>{room.creator.name}</Text>
      <Text>{room.key}</Text>
    </View>
    */
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 0,
    height: '100%',
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
  playerContainer:{
    backgroundColor: '#33385b',
    flex: 0,
    height: screenHeight *0.35,
  },
  chatContainer:{
    backgroundColor: '#44485b',
    flex: 1,
  },
});