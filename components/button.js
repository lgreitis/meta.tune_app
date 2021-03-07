import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function Button ({ onPress, title, backgroundColor})
  {
    return(
        <TouchableOpacity
        onPress={onPress}
        style={[
          styles.appButtonContainer,
          backgroundColor && { backgroundColor }
        ]}
      >
        <Text style={[styles.appButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
      );
  }

  const styles = StyleSheet.create({
    appButtonContainer: {
      height: 50,
      borderRadius: 30,
      flex: 1,
      maxHeight: 50,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginHorizontal: 10,
    },
    appButtonText: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    }
  });