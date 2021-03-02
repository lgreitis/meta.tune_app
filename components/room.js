import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'; 


export default function Room({ pressHandler, item, toggleFavorite }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.url}} style={styles.image}/>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.roomName}</Text>
        </View>
        <TouchableWithoutFeedback>
        <View style={styles.viewsContainer}>
          <MaterialIcons name="people" size={30} color="white" />
          <Text style={styles.viewersCount}>{item.viewersCount}</Text>

          <TouchableWithoutFeedback onPress={toggleFavorite}>
          <View style={styles.favorite}>
            {item.favorite 
              ?<MaterialIcons name='favorite' size={26} color='white'/>
              :<MaterialIcons name='favorite-border' size={26} color='white'/>
            }
            
          </View>
          </TouchableWithoutFeedback>

        </View>
        </TouchableWithoutFeedback>
      </View>

    </TouchableOpacity>
  )
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    container:
    {
      backgroundColor: '#43485b',
      marginHorizontal: 10,
      marginBottom: 20,
      borderRadius: 20,
      width: win.width * 0.42,
      borderWidth: 1,
      borderColor: '#44475a',
      flex: 1,
    },
    image:{
      height: 96,
      width: 'auto',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
    },
    imageContainer: 
    {
      backgroundColor:'#43485b',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      flex: 1,
    },
    title:{
      color: 'white',
      fontSize: 17,
    },
    titleContainer:{
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 12,
      flex: 1,
    },
    viewsContainer:{
      flex: 1,
      flexDirection:'row',
      alignItems: 'flex-end',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 5,
    },
    viewersCount: {
      color: 'white',
      fontSize: 18,
      paddingLeft: 3,
    },
    favorite: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
      paddingBottom: 2,
    }

  });