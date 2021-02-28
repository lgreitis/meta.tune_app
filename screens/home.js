import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Room from '../components/room';
import Button from '../components/button'

export default function Home() {
    const[rooms, setRooms] = useState (
        [
            {
                imgUrl:'aa',
                roomName:'Room1',
                viewersCount: 12,
                favorite: false,
                key: '1'
            },
            {
                imgUrl:'a',
                roomName:'Room2',
                viewersCount: 54,
                favorite: true,
                key: '2'
            },
            {
              imgUrl:'abc',
              roomName:'Room3',
              viewersCount: 56,
              favorite: true,
              key: '3'
            },
            {
              imgUrl:'abc',
              roomName:'Room3',
              viewersCount: 56,
              favorite: true,
              key: '4'
            },
            {
              imgUrl:'abc',
              roomName:'Room3',
              viewersCount: 56,
              favorite: true,
              key: '5'
            },
            {
              imgUrl:'abc',
              roomName:'Room3',
              viewersCount: 56,
              favorite: true,
              key: '6'
            },
            {
              imgUrl:'abc',
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
            onPress={() => console.log("search")} 
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
    paddingTop: 0,
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
      flex: 0,
  }
  
});