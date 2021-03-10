import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';


export default function Header({ title, navigation }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '9%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#43485b',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: '2%',
  },
  headerText: {
    fontSize: 32,
    color: 'white',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    left: 16,
    color: 'white',
  }
});