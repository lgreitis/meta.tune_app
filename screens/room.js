import React, { useEffect } from 'react';
import { StyleSheet, View, Text, BackHandler } from 'react-native';
import io from 'socket.io-client';



export default function Home({ route }) {
  const { room } = route.params;


  var socket = io("http://88.119.36.191:8888", {
    query: {
      slug: room.slug
    },
    transports: ["websocket"] // HTTP long-polling is disabled
  });


  socket.on('chat message', (content) => {
    console.log(content)
  });

  BackHandler.addEventListener('hardwareBackPress', function () {
    socket.disconnect()
  });
  

  return (
    <View style={styles.container}>

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

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#43485b',
    flex: 1,
  },
});