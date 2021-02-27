import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Room({ pressHandler, item }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <Text style={styles.item}>{item.imgUrl}</Text>
      <Text style={styles.item}>{item.roomName}</Text>
      <Text style={styles.item}>{item.viewersCount}</Text>
      <Text style={styles.item}>{item.favorite}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    item: {
      padding: 16,
    }
  });