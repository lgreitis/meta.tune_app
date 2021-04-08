import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions, KeyboardAvoidingView } from 'react-native';
import Room from '../components/room';
import Button from '../components/button'
import roomUtils from '../lib/roomUtils'
import { MaterialIcons } from '@expo/vector-icons';
import SideMenu from 'react-native-side-menu-updated'
import Menu from '../components/menu'
import { authContext } from '../context/authContext';


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

  const [showFavorites, setShowFavorites] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => {
    setTimeout(() => { setIsMenuOpen(!isMenuOpen) }, 0)
  }

  const { signOut } = React.useContext(authContext);

  useEffect(() => {
    getRooms();
  }, []);


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
    if (rooms.length > 0) {
      if (!showFavorites) {
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
    setShowFavorites(true)
  }

  const exploreHandler = () => {
    setShowFavorites(false)
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

  const menu = <Menu navigation={navigation} signOut={signOut} closeMenu={closeMenu} />
  return (
    <View style={styles.container}>
      <SideMenu
        menu={menu}
        openMenuOffset={screen.width * 0.7}
        menuPosition='right'
        isOpen={isMenuOpen}
        onChange={toggleMenu}
        overlayColor={'rgba(0,0,0,0.4)'}

      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>{"Home"}</Text>
            </View>
            <View style={styles.menuContainer}>
              <MaterialIcons name="menu" style={[styles.icon, styles.menuIcon]} onPress={toggleMenu} />
            </View>

          </View>

          <View style={styles.contentContainer}>
            <View style={styles.buttonsContainer}>

              <Button
                onPress={exploreHandler}
                title='All rooms'
                backgroundColor={showFavorites? '#44495c' : '#bd93f9'}
              />

              <Button
                onPress={showFavoritesHandler}
                title='Favorites'
                backgroundColor={!showFavorites? '#44495c' : '#bd93f9'}
              />
            </View>

            <View style={styles.roomsList}>
              <FlatList
                data={showRooms()}
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
          </View>
        </KeyboardAvoidingView>
      </SideMenu>
    </View>
  );
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    zIndex: 0,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#272b36',
    zIndex: 0,
  },
  roomsList: {
    backgroundColor: '#272b36',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    width: '100%',
    maxHeight: screen.height * 0.1,
    height: screen.height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#474b53',
    paddingBottom: '2%',
    flex: 0,
    zIndex: 1,
    overflow: 'visible',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  headerTextContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
  },
  menuIcon: {
    color: 'white',
    fontSize: 30,
    zIndex: 1,
  },
  menuContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    zIndex: 1,

  },
});