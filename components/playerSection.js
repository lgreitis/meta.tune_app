import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";
import { getYoutubeMeta } from 'react-native-youtube-iframe';
import Button from './button';


const PlayerSection = React.forwardRef((props, ref) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [addSong, setAddSong] = useState(false);
  const [name, setName] = useState('')
  const [songId, setSongId] = useState('')
  const [startAt, setStartAt] = useState(0);
  const [isPlaying, setisPlaying] = useState(true);

  const playerRef = useRef();

  useEffect(() => {
    ref.current.on('now playing', (id) => changeSong(id, 0))
  }, []);

  useEffect(() => {
    if (songId) {
      getYoutubeMeta(songId).then(meta => {
        setName(meta.title);
        console.log(meta.title);
      });
    }
  }, []);


  const joinQueue = () => {
    ref.current.emit('join queue');
  }

  const skipSong = () => {
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

  const changeSong = (id, startAt) => {
    setSongId('');
    setSongId(id);
    setStartAt(startAt)
    if (id) {
      getYoutubeMeta(id).then(meta => {
        setName(meta.title);
        console.log(meta.title);
      });
    }
  }

  const autoPlay = () => {
    setisPlaying(false);
    setisPlaying(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.songName}>{name}</Text>
        <Text style={styles.userName}>{"Sinsils"}</Text>
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
        <Button
          title='join queue'
          color='black'
          onPress={joinQueue}
        />
        <Button
          title='skip'
          color='black'
          onPress={skipSong}
        />

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
    color: 'white',
  },
  userName: {
    color: 'white',
  },

});