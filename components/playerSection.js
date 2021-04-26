import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Dimensions, DeviceEventEmitter } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";
import { getYoutubeMeta } from 'react-native-youtube-iframe';
import Button from './button';
import { playlistContext } from '../context/playlistContext'
import roomUtils from '../lib/roomUtils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { alertContext } from '../context/alertContext';


const PlayerSection = React.forwardRef((props, ref) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [addSong, setAddSong] = useState(false);
  const [songName, setSongName] = useState('')
  const [userName, setUserName] = useState('')
  const [songId, setSongId] = useState('')
  const [startAt, setStartAt] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const [name, setName] = useState('')

  const showPlaylist = React.useContext(playlistContext);
  const playerRef = useRef();
  const alert = React.useContext(alertContext);

  const [songs, setSongs] = useState([])
  useEffect(() => {
    ref.current.on('now playing', (msg) => changeSong(msg))
    getUserSongs();
    getName();
  }, []);

  useEffect(() => {
    let subscription = DeviceEventEmitter.addListener("userSongRequest", (songId) => joinQueue(songId))
    return () => {
      subscription.remove()
    }
  }, [])


  useEffect(() => {
    if (songId) {
      getYoutubeMeta(songId).then(meta => {
        setSongName(meta.title);
        console.log(meta.title);
      });
    }
  }, []);

  const getName = async () => {
    try {
      const value = await AsyncStorage.getItem('@name')
      if (value !== null) {
        setName(value)
      }
    } catch (e) {
      console.log("failed getting name")
      console.log(e)
    }
  }

  const getUserSongs = () => {
    let songs = []
    let key = 1
    roomUtils.getSongs((serverSongs) => {
      serverSongs.map(song => {
        if (song == null)
          return;
        songs.push({
          key: key,
          id: song.yt_id,
          title: song.title,
          length: song.length
        })
        key++;
      })
      setSongs(songs);
    })
  }

  const joinQueuePressHandler = () => {
    showPlaylist(songs)
  }
  const joinQueue = (id) => {
    console.log("Joining queue. Id: " + id)
    ref.current.emit('join queue', id)
  }

  const skipSong = () => {
    if(!isPlaying)
    {
      alert("There is no song playing right now.");
      return;
    }
    ref.current.emit("skip");
  }

  const likePressHandler = () => {
    if (like == false) {
      setLike(true);
      setDislike(false);
    }
    else {
      setLike(false);
    }
  }
  const dislikePressHandler = () => {
    if (dislike == false) {
      setDislike(true);
      setLike(false);
    }
    else {
      setDislike(false);
    }
  }
  const addSongPressHandler = () => {
    setAddSong(!addSong);
  }

  const changeSong = (msg) => {
    if (msg.mediaId != 'false') {
      setUserName(msg.playingData.playingUser)
      if (msg.new) {
        setSongId('');
        setSongId(msg.mediaId)
        setStartAt(0)
      }
      else {
        const milli = Date.now() - msg.playingData.syncTime
        const sec = Math.floor(milli / 1000);
        setSongId('');
        setSongId(msg.mediaId)
        setStartAt(sec)
      }
      if (msg.mediaId) {
        getYoutubeMeta(msg.mediaId).then(meta => {
          setSongName(meta.title);
          console.log(meta.title);
        });
      }
    }
  }

  const autoPlay = () => {
    setisPlaying(false);
    setisPlaying(true);
  }

  const addToPlaylistPressHandler = () => {
    if (!songId || !isPlaying) {
      alert("There is no song playing right now.")
      return;
    }

    roomUtils.addSongToPlaylist(songId, (res, status) => {
      console.log(status)
      switch (status) {
        case 201:
          alert('Song added!\n' + songName)
          return;
        case 401:
          alert('Not logged in :(')
          return;
        case 403:
          alert('Song already exists');
          return;
        case 406:
          alert('Song is too long or age restricted')
          return;
        default:
          alert("Something went wrong on the server. Try again later");
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.songName}>{songName}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.playerContainer}>
        {songId ?
          <YoutubePlayer
            ref={playerRef}
            height={300}
            play={isPlaying}
            initialPlayerParams={{
              controls: false,
              preventFullScreen: true,
              allowWebViewZoom: false,
              start: startAt,
            }}
            forceAndroidAutoplay
            videoId={songId}
            onReady={autoPlay}
          />
          :
          <View>

          </View>
        }

        <View style={styles.playerOverlay} />
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title='join queue'
            fontSize={20}
            onPress={joinQueuePressHandler}
          />
        </View>

        {name == props.room.creator.name ?
          <View style={styles.buttonContainer}>
            <Button
              title='skip'
              fontSize={20}
              onPress={skipSong}
            />
          </View> :
          <View></View>
        }
        {isPlaying ?
          <View style={styles.buttonContainer}>
            <Button
              title='add to playlist'
              fontSize={20}
              onPress={addToPlaylistPressHandler}
            />
          </View> :
          <View></View>
        }



        {/* <TouchableOpacity style={styles.likeIconContainer} onPress={likePressHandler}>
          {like
            ? <MaterialIcons name='thumb-up' style={styles.icon} color='white' />
            : <MaterialIcons name='thumb-up-off-alt' style={styles.icon} color='white' />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.dislikeIconContainer} onPress={dislikePressHandler}>
          {dislike
            ? <MaterialIcons name='thumb-down' style={styles.icon} color='white' />
            : <MaterialIcons name='thumb-down-off-alt' style={styles.icon} color='white' />
          }
        </TouchableOpacity >
        <TouchableOpacity style={styles.addSongIconContainer} onPress={addSongPressHandler}>
          {addSong
            ? <MaterialIcons name='star' style={styles.icon} color='white' />
            : <MaterialIcons name='star-border' style={styles.icon} color='white' />
          }
        </TouchableOpacity> */}
      </View>

    </View>
  );
});

export default PlayerSection;

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#282a36',
  },
  headerContainer: {
    backgroundColor: '#282a36',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  playerContainer: {
    backgroundColor: '#44475a',
    height: screen.width / (16 / 9),
  },
  playerOverlay:
  {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 100,
  },
  footerContainer: {
    flex: 0,
    backgroundColor: '#282a36',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#474b53',
    flexWrap: 'nowrap',
    alignContent: 'center',
  },
  buttonContainer: {
    // backgroundColor: '#bd93f9'

  },

  icon: {
    fontSize: 40,
  },
  dislikeIconContainer: {

  },
  likeIconContainer: {

  },
  addSongIconContainer: {

  },
  songName: {
    color: 'white',
  },
  userName: {
    color: 'white',
  },

});