import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import Room from '../components/room';
export default function Home() {
    const[rooms, setRooms] = useState (
        [
            {
                imgUrl:'1.png',
                roomName:'name1',
                viewersCount: 12,
                favorite: false,
                key: 1
            },
            {
                imgUrl:'1.png',
                roomName:'name2',
                viewersCount: 54,
                favorite: true,
                key: 2
            }
        ]
    )
    const roomPressHandler = (key) =>
    {
        //TODO: implement
    }
  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.title}>Rooms</Text>
    </View>
      
      <View style={styles.contentContainer}>

        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
                <Button onPress={() => console.log("search")} title='Search'  color='#bf9dfc' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Button onPress={() => console.log("favorites")} title='Favorites' color='#43485b' />
            </TouchableOpacity>
        </View>

        
        { //TODO: IMPLEMENT
            /* <View style={styles.roomsList}>
            <FlatList 
                data= {rooms}
                renderItem={({ item }) => (
              <Room item={item} pressHandler={roomPressHandler} />
            )}
            />
        </View> */}

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#43485b',
    paddingTop: 20,
  },
  title: {

    color: '#f1f6f6',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  buttonsContainer:{
     flex: 0, 
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-around',
     padding: 25,
     backgroundColor: '#382c36'
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
  button:{
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  roomsList:{
      backgroundColor: 'gray',
  }
});