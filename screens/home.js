import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Room from '../components/room';
import Button from '../components/button'
import Header from '../components/header'
import roomUtils from '../lib/roomUtils'

export default function Home({ navigation }) {
  const [rooms, setRooms] = useState([
    {
      url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
      roomName: 'Lofi and chill',
      viewersCount: 12,
      favorite: false,
      key: '1'
    },
  ])

  const [showFavorites, setShowFavorites] = useState(
    {
      favorite: false
    }
  )

  useEffect(() =>
  {
    if(rooms !== null)
    {
      setRooms([]);
      getRooms();
    }
    
  }, []);

  const getRooms = () => {
    let key = 1;
    roomUtils.getRooms((serverRooms) => {
      serverRooms.map(room => {
        addRoom(room, key);
        key++;
      })
    })
  }
  const addRoom = (room, key) => {
    setRooms(oldRooms => {
      return [
        {
          key: key,
          roomName: room.name,
          url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
          viewersCount: 12,
          favorite: false,
          slug: room.slug,
          desc: room.desc,
          motd: room.motd,
          creator: room.creator,
        },
        ...oldRooms
      ]
    })
  }


  const roomPressHandler = (key) => {
    console.log("room press id " + key);
    navigation.navigate('Room', { room: rooms.find(room => room.key == key) });
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
    if(rooms.length > 0)
    {
      if (!showFavorites.favorite) {
        return [...rooms].sort((roomA, roomB) =>
          (roomA.viewersCount > roomB.viewersCount) ? -1 : 1);
      }
      else {
        return rooms.filter(room => room.favorite);
      }
    }
    else return rooms;
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
      <Header title='Home' />

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