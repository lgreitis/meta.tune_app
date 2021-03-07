import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Room from '../components/room';
import Button from '../components/button'

export default function Home({navigation}) {
  const [rooms, setRooms] = useState(
    [
      {
        url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
        roomName: 'Lofi and chill',
        viewersCount: 12,
        favorite: false,
        key: '1'
      },
      {
        url: 'https://img.youtube.com/vi/vQjiN8Qgs3c/hqdefault.jpg',
        roomName: 'Learning web sockets',
        viewersCount: 54,
        favorite: true,
        key: '2'
      },
      {
        url: 'https://img.youtube.com/vi/93ZU6j59wL4/hqdefault.jpg',
        roomName: 'Very very very very long name',
        viewersCount: 56,
        favorite: true,
        key: '3'
      },
      {
        url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
        roomName: 'AAAAAAAAAAAAAAAAAAAAAAAAAA',
        viewersCount: 120,
        favorite: true,
        key: '4'
      },
      {
        url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
        roomName: 'Room3',
        viewersCount: 3,
        favorite: true,
        key: '5'
      },
      {
        url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
        roomName: 'Room456',
        viewersCount: 5,
        favorite: true,
        key: '6'
      },
      {
        url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
        roomName: 'Room579',
        viewersCount: 6,
        favorite: true,
        key: '7'
      }
    ]
  )

  const [showFavorites, setShowFavorites] = useState(
    {
      favorite: false
    }
  )

  const roomPressHandler = (key) => {
    console.log("room press id " + key);
    navigation.navigate('Room', {room: rooms.find(room => room.key == key)});
  }
  const toggleFavorite = (key, isFavorite) => {
    setRooms(rooms.map(room => {
      if (room.key == key) {
        return { ...room, favorite: !isFavorite }
      }
      else return room;
    }))
  }

  const showRooms = () => {
    if (!showFavorites.favorite) {
      return [...rooms].sort((roomA, roomB) =>
        (roomA.viewersCount > roomB.viewersCount) ? -1 : 1);
    }
    else {
      return rooms.filter(room => room.favorite);
    }
  }

  const showFavoritesHandler = () => {
    setShowFavorites(
      {
        favorite: true
      }
    )
  }

  const exploreHandler = () => {
    setShowFavorites(
      {
        favorite: false
      }
    )
  }

  const renderNoStateMessage = () => {
    return (
      <Text style={{ color: 'white' }}>{"No rooms :("}</Text>
    )
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
          <Text style={styles.title}>Rooms</Text>
      </View> */}

      <View style={styles.contentContainer}>
        <View style={styles.buttonsContainer}>

          <Button
            onPress={exploreHandler}
            title='Explore'
            backgroundColor='#44495c'
          />

          <Button
            onPress={showFavoritesHandler}
            title='Favorites'
            backgroundColor='#44495c'
          />
        </View>

        <View style={styles.roomsList}>
          <FlatList
            data={showRooms()}
            numColumns={2}
            horizontal={false}
            ListEmptyComponent={renderNoStateMessage()}
            renderItem={({ item }) =>
            (
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
  buttonsContainer: {
     height: 90,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-around',
     paddingVertical: 20,
     paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#272b36',
  },
  roomsList: {
    backgroundColor: '#272b36',
    alignItems: 'center',
    flex: 1,
  }
});