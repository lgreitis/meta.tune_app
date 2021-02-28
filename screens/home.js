import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Room from '../components/room';
import Button from '../components/button'

export default function Home() {
    const[rooms, setRooms] = useState (
        [
            {
                url:'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
                roomName:'Lofi and chill',
                viewersCount: 12,
                favorite: false,
                key: '1'
            },
            {
                url:'https://img.youtube.com/vi/vQjiN8Qgs3c/hqdefault.jpg',
                roomName:'Learning web sockets',
                viewersCount: 54,
                favorite: true,
                key: '2'
            },
            {
              url:'https://img.youtube.com/vi/93ZU6j59wL4/hqdefault.jpg',
              roomName:'Very very very very long name',
              viewersCount: 56,
              favorite: true,
              key: '3'
            },
            {
              url:'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
              roomName:'AAAAAAAAAAAAAAAAAAAAAAAAAA',
              viewersCount: 56,
              favorite: true,
              key: '4'
            },
            {
              url:'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
              roomName:'Room3',
              viewersCount: 56,
              favorite: true,
              key: '5'
            },
            {
              url:'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
              roomName:'Room3',
              viewersCount: 56,
              favorite: true,
              key: '6'
            },
            {
              url:'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
              roomName:'Room3',
              viewersCount: 56,
              favorite: true,
              key: '7'
            }
        ]
    )
    const roomPressHandler = (key) =>
    {
        //TODO: implement
        console.log("room press id " + key);
    }
    const toggleFavorite = (key, isFavorite) =>
    {
      setRooms(rooms.map(room =>
        {
          if(room.key == key)
          {
            return{...room, favorite: !isFavorite}
          }
          else return room;
        }))
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>Rooms</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.buttonsContainer}>

          <Button 
            onPress={() => console.log("searchh")} 
            title='Search'
            backgroundColor= '#bf9dfe'
          />

          <Button
            onPress={() => console.log("favorites")} 
            title='Favorites' 
            backgroundColor= '#44495c'
          />     
        </View>

        <View style={styles.roomsList}>
          <FlatList
              data= {rooms}
              numColumns={2}
              horizontal={false}
              renderItem={({ item }) => (
            <Room 
              item={item} 
              pressHandler={() => roomPressHandler(item.key)}
              toggleFavorite={() => toggleFavorite(item.key, item.favorite)} 
              />
          )}
          />
          
        </View> 
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#43485b',
  },
  title: {
    color: '#f1f6f6',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonsContainer:{
     flex: 0, 
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-around',
     paddingVertical: 20,
     paddingHorizontal: 10,
  },
  contentContainer:{
    flex: 1,
    backgroundColor: '#272b36',
  },
  header:{
    flex: 0,
    justifyContent: 'flex-end',
    height: 75,
    paddingBottom: 10,
  },
  roomsList:{
      backgroundColor: '#272b36',
      alignItems: 'center',
      flex: 1,
  }
});