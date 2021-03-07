import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home({route}) {
  const {room} = route.params;
  return (
    <View style={styles.container}>
      <Text>{room.roomName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#43485b',
    flex: 1,
  },
});