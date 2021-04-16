import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback,
    Keyboard, Touchable, TouchableOpacity, Dimensions, KeyboardAvoidingView, FlatList
} from 'react-native';
import roomUtils from '../lib/roomUtils'
import { alertContext } from '../context/alertContext';
import { MaterialIcons } from '@expo/vector-icons';
import SongItem from '../components/songItem'
import { getYoutubeMeta } from 'react-native-youtube-iframe';

export default function Playlist({ route, navigation }) {

    const [songs, setSongs] = useState([
        // {
        //     title: 'Zoliukas - Rojaus Obuoliukai Ft. Saules Berniukas (Official Audio)',
        //     key: 1,
        //     id: 'BuztD_ydkYg',
        //     length: 186,
        // },
    ]);
    const [addSongId, setAddSongId] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const alert = React.useContext(alertContext);
    useEffect(() => {
        getSongs();
    }, []);

    const getSongs = () => {
        let songs = [];
        let key = 1;

        setRefreshing(true)
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
            setRefreshing(false)
        })
    }

    const renderNoStateMessage = () => {
        return (
            <View>
                {refreshing ?
                    <Text style={{ color: 'white' }}>{"Loading songs..."}</Text>
                    :
                    <Text style={{ color: 'white' }}>{"No songs :("}</Text>
                }
            </View>
        )
    }

    const deleteSong = (key) => {
        roomUtils.deleteSongFromPlaylist(key, (res, status) => {
            console.log(status)
            switch (status) {
                case 200:
                    alert('Song deleted!\n' + songs[key - 1].title)
                    getSongs();
                    return;
                case 401:
                    alert('Not logged in :(')
                    return;
                case 500:
                    alert('Server made an oopsy');
                    return;
                default:
                    alert('Something went wrong')
            }})

    }

    let IDRegExp = /[a-zA-Z0-9_-]{11}/
    let URLRegExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
    const addSong = () => {

        let id = addSongId.trim();
        if (!IDRegExp.test(id) || id.length != 11) {
            let extractedId = id.match(URLRegExp);
            if (extractedId == null) {
                alert("Youtube ID is invalid")
                return;
            }
            else {
                id = extractedId[1];
                if (id.length != 11) {
                    alert("Link is invalid")
                    return;
                }
                console.log("Id extracted")
            }
        }

        console.log(id);
        getYoutubeMeta(id).then(meta => {
            console.log(meta.title);
            roomUtils.addSongToPlaylist(id, (res, status) => {
                console.log(status)
                switch (status) {
                    case 201:
                        alert('Song added!\n' + meta.title)
                        Keyboard.dismiss()
                        setAddSongId('')
                        getSongs();
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
                        console.log("something went wrong")
                }
            })
        }).catch((err) => { 
            alert("Something went wrong on the server. Try again later"); 
            return; 
        })
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>

                <View style={styles.header}>
                    <MaterialIcons name="arrow-back" style={[styles.icon, styles.backIcon]} onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>{"My playlist"}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        <View style={styles.input}>
                            <TextInput
                                placeholder='Add song youtube ID here'
                                onChangeText={setAddSongId}
                                placeholderTextColor='#6272a4'
                                value={addSongId}
                                color='white'
                            />
                        </View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={addSong}>
                            <Text style={styles.inputText}>{"Add"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.songsList}>
                        <FlatList
                            data={songs}
                            horizontal={false}
                            keyExtractor={item => item.key.toString()}
                            renderItem={({ item }) =>
                            (
                                <SongItem item={item} deleteSong={deleteSong} />
                            )}
                            ListEmptyComponent={renderNoStateMessage}
                            onRefresh={() => getSongs()}
                            refreshing={refreshing}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282a36',
        flex: 1,
    },
    textInput: {
        backgroundColor: '#44475a',
        marginBottom: 10,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },

    text: {
        color: '#6272a4',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 25,
        alignSelf: 'center',
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
        top: '50%',
    },
    backIcon: {
        left: 16,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 10,
    },
    input: {
        backgroundColor: '#44475a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        justifyContent: 'center',
        width: '75%',
    },
    songsList: {
        flex: 1,
        alignItems: 'center'
    },
    inputText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonContainer: {
        backgroundColor: '#bd93f9',
        width: '20%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',

    },
    formContainer: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50,
        marginHorizontal: 10,
        marginBottom: 10,
        minHeight: 50,
    },
});