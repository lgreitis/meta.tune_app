import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import SongItem from './songSelectItem'
export default props => {
    const { isOpen, close, songs } = props;
    const [selectedKey, setSelectedKey] = React.useState(null);

    const renderNoStateMessage = () => {
        return (
            <View>
                <Text style={{ color: 'white' }}>{"No songs :("}</Text>
            </View>
        )
    }
    const returnSongId = () => {
        let songId = ''
        if(selectedKey !== null)
        {
            songId = songs[selectedKey - 1].id;
        }
        setSelectedKey(null)

        close(songId)
    }
    return (
        <Modal visible={isOpen} transparent={true} statusBarTranslucent={true} animationType={'fade'} >
            <View style={styles.overlay}>
                <View style={styles.playlistContainer}>
                    <View style={styles.songList}>
                        <FlatList
                            data={songs}
                            horizontal={false}
                            keyExtractor={item => item.key.toString()}
                            renderItem={({ item }) =>
                            (
                                <SongItem
                                    item={item}
                                    selectedKey={selectedKey}
                                    onPress={() => setSelectedKey(item.key)} />
                            )}
                            ListEmptyComponent={renderNoStateMessage}
                            extraData={selectedKey}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={returnSongId}>
                        <View style={styles.button}>
                            <Text style={[styles.buttonText]}>{"Join queue"}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    //   MainContainer: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop: (Platform.OS == 'ios') ? 20 : 0
    //   },
    playlistContainer: {
        width: '100%',
        minHeight: 100,
        maxHeight: 500,
        backgroundColor: '#282a36',
        borderRadius: 30,
        overflow: 'hidden',
    },
    alertMessageContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexGrow: 1,
        minWidth: 50,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    songList: {
        maxHeight: 420,
        alignItems: 'center'
    },


    buttonContainer: {
        flex: 1,
        maxHeight: 100,
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
    },
    button: {
        backgroundColor: '#bd93f9',
        height: 50,
        width: '80%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
});