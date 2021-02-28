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
      width: 150,
      height: 50,
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    appButtonText: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    }
  });