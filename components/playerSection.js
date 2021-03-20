import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";
import {getYoutubeMeta} from 'react-native-youtube-iframe';

export default function PlayerSection({ title, navigation }) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [addSong, setAddSong] = useState(false);
  const [name, setName] = useState('')
  const [songId, setSongId] = useState('s8P2AFGvc7g')
  const playerRef = useRef();
  

  getYoutubeMeta(songId).then(meta => {
    setName(meta.title);
  });

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
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.songName}>{name}</Text>
        <Text style={styles.userName}>{"Sinsils"}</Text>
      </View>
      
        <View style={styles.playerContainer}>
          <YoutubePlayer
            ref={playerRef}
            height={300}
            play={true}
            initialPlayerParams={{
              controls: false,
              preventFullScreen: true,
              allowWebViewZoom: false
            }}
            forceAndroidAutoplay
            videoId={songId}
          />
          <View style={styles.playerOverlay} />
        </View>
      
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.likeIconContainer} onPress={likePressHandler}>
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
        </TouchableOpacity>
      </View>

    </View>
  );
}

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
    backgroundColor: '#282a36',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#474b53',
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
    color : 'white',
  },
  userName: {
    color: 'white',
  },

});