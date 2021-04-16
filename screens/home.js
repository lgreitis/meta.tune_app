import React, { useEffect, useState, useRef, createRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  FlatList, Dimensions, KeyboardAvoidingView, TextInput, Keyboard, Platform
} from 'react-native';
import Room from '../components/room';
import Button from '../components/button'
import roomUtils from '../lib/roomUtils'
import { MaterialIcons } from '@expo/vector-icons';
import SideMenu from 'react-native-side-menu-updated'
import Menu from '../components/menu'
import { authContext } from '../context/AuthContext';
import { useIsFocused } from "@react-navigation/native";


export default function Home({ navigation }) {
  const [rooms, setRooms] = useState([
    // {
    //   url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
    //   roomName: 'Lofi and chill',
    //   viewersCount: 12,
    //   favorite: false,
    //   key: '1'
    // },
  ])
  const [showRooms, setShowRooms] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);

  const inputRef = useRef(null);
  const { signOut } = React.useContext(authContext);
  const isFocused = useIsFocused();

  
  useEffect(() => {
    getRooms();
  }, [isFocused]);

  useEffect(() => {
    displayRooms()
  }, [searchText, showFavorites, rooms])

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    };
  }, []);

  const keyboardDidHide = () => {
    setIsKeyboardOn(false)
  }

  const keyboardDidShow = () => {
    setIsKeyboardOn(true)
  }
  const searchPress = () => {
    inputRef.current.focus()
  }

  const toggleMenu = () => {
    setTimeout(() => { setIsMenuOpen(!isMenuOpen) }, 0)
    Keyboard.dismiss()
  }

  const getRooms = () => {
    let rooms = [];
    let key = 1;
    setRefreshing(true)

    roomUtils.getRooms((serverRooms) => {
      serverRooms.map(room => {
        rooms.push({
          key: key,
          roomName: room.name,
          url: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
          viewersCount: Math.floor(Math.random() * 100) + 1,
          favorite: false,
          slug: room.slug,
          desc: room.desc,
          motd: room.motd,
          creator: room.creator,
        })
        key++;
      })
      setRooms(rooms);
      setRefreshing(false)
    })
  }

  const displayRooms = () => {
    setRefreshing(true)
    let roomsToShow = [];
    if (searchText) {
      roomsToShow = filterRooms(rooms)
    }
    else {
      roomsToShow = rooms
    }

    if (showFavorites) {
      roomsToShow = roomsToShow.filter(room => { return room.favorite })
    }
    roomsToShow.sort((roomA, roomB) =>
      (roomA.viewersCount > roomB.viewersCount) ? -1 : 1);
    setShowRooms(roomsToShow)
    setRefreshing(false)
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
    setShowRooms(showRooms.map(room => {
      if (room.key == key) {
        return { ...room, favorite: !isFavorite }
      }
      else return room;
    }))
  }

  const filterRooms = (rooms) => {
    return (rooms.filter(room => {
      return room.roomName.toLowerCase().includes(searchText.toLowerCase())
    }))
  }

  const renderNoStateMessage = () => {

    return (
      <View>
        {refreshing ?
          <Text style={{ color: 'white' }}>{"Loading rooms..."}</Text>
          :
          <Text style={{ color: 'white' }}>{"No rooms :("}</Text>
        }
      </View>
    )
  }

  const menu = <Menu navigation={navigation} signOut={signOut} closeMenu={toggleMenu} />
  return (
    <View style={{ flex: 1, backgroundColor: '#44475a' }}>
      <SideMenu
        menu={menu}
        openMenuOffset={screen.width * 0.7}
        menuPosition='right'
        isOpen={isMenuOpen}
        onChange={toggleMenu}
        overlayColor={'rgba(0,0,0,0.4)'}
        backgroundColor={'black'}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.container]}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: -50 })}
        >



          <View style={styles.header}>
            <MaterialIcons name="search" style={[styles.icon, styles.searchIcon]} onPress={searchPress} />
            <Text style={styles.headerText}>{"Home"}</Text>
            <MaterialIcons name="menu" style={[styles.icon, styles.menuIcon]} onPress={toggleMenu} />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => setShowFavorites(false)}
              title='All rooms'
              backgroundColor={showFavorites ? '#44495c' : '#bd93f9'}
            />

            <Button
              onPress={() => setShowFavorites(true)}
              title='Favorites'
              backgroundColor={!showFavorites ? '#44495c' : '#bd93f9'}
            />
          </View>

          <View style={styles.roomsList}>
            <FlatList
              data={showRooms}
              numColumns={2}
              horizontal={false}
              onRefresh={() => getRooms()}
              refreshing={refreshing}
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

          <View style={(isKeyboardOn || searchText) ? styles.inputContainer : { height: 0, width: 0 }}>
            <TextInput
              placeholder='Search rooms'
              onChangeText={setSearchText}
              placeholderTextColor='#6272a4'
              value={searchText}
              color='white'
              ref={inputRef}
              style={styles.input}
            />
          </View>

        </KeyboardAvoidingView>
      </SideMenu>
    </View>

  );
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    marginHorizontal: 10,
    marginVertical: 10,

  },
  input: {
    backgroundColor: '#44475a',

    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#272b36',
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
    zIndex: 0,
    backgroundColor: '#272b36'
  },
  contentContainer: {
    backgroundColor: '#272b36',
  },
  roomsList: {
    backgroundColor: '#272b36',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    width: '100%',
    height: screen.height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#44475a',
    alignItems: 'flex-end',
    paddingBottom: '2%',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
    fontSize: 30,
    position: 'absolute',
    top: '55%',
  },
  menuIcon: {
    right: 16
  },
  searchIcon: {
    left: 16,
  },
  menuContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    zIndex: 1,
  },
});