import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#43485b',
  },
  headerText: {
    fontSize: 32,
    color: 'white',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
    color: 'white',
  }
});