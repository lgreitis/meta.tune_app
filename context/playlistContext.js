import React from 'react';
import Playlist from '../components/playlist';
import {DeviceEventEmitter} from 'react-native'
const initialState = {
  isOpen: false,
  songs: []
};
export const playlistContext = React.createContext(initialState);
const { Provider } = playlistContext;
export default props => {
  const [playlistState, setPlaylistState] = React.useState(initialState);
  
  showPlaylist = (songs) => {
    setPlaylistState({
      isOpen: true,
      songs: songs
    });
  };
  close = (songId) => {
    console.log("songId:" + songId);
    if(songId !== "")
      DeviceEventEmitter.emit("userSongRequest", songId)
    setPlaylistState(initialState);
  };
  return (
    <>
      <Provider value={showPlaylist}>{props.children}</Provider>
      <Playlist {...playlistState} close={close}  />
    </>
  );
};