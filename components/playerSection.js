import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";

export default function PlayerSection({ title, navigation }) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [addSong, setAddSong] = useState(false);
  const [name, setName] = useState('')
  const playerRef = useRef();

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
            controls: false
          }}
          forceAndroidAutoplay
          videoId={"jzD_yyEcp0M"}
        />
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.likeIconContainer} onPress={likePressHandler}>
          {like
            ? <MaterialIcons name='thumb-up' style={styles.icon} color='black' />
            : <MaterialIcons name='thumb-up-off-alt' style={styles.icon} color='black' />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.dislikeIconContainer} onPress={dislikePressHandler}>
          {dislike
            ? <MaterialIcons name='thumb-down' style={styles.icon} color='black' />
            : <MaterialIcons name='thumb-down-off-alt' style={styles.icon} color='black' />
          }
        </TouchableOpacity >
        <TouchableOpacity style={styles.addSongIconContainer} onPress={addSongPressHandler}>
          {addSong
            ? <MaterialIcons name='star' style={styles.icon} color='black' />
            : <MaterialIcons name='star-border' style={styles.icon} color='black' />
          }
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  headerContainer: {
    backgroundColor: '#ccc',
    height: '15%',
  },
  playerContainer: {
    backgroundColor: '#bbb',
    height: '70%'
  },
  footerContainer: {
    backgroundColor: '#eee',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

});