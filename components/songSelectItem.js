import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function SongItem({ item, selectedKey, onPress }) {
    const imageUrl = 'https://img.youtube.com/vi/' + item.id + '/default.jpg';
    let length = new Date(item.length * 1000).toISOString().substr(14, 5);
    const backgroundColor = item.key === selectedKey? '#44475a': '#282a36'; 
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <View style={[styles.container,{backgroundColor: backgroundColor}]}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: imageUrl }}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                    <View style={styles.lengthContainer}>
                        <Text style={styles.text}>{length}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        width: Dimensions.get('screen').width,
        borderBottomWidth: 1,
        borderBottomColor: '#44475a',
    },
    imageContainer: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 90,
        width: 120,
        borderRadius: 10,
    },
    songContainer: {
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    titleContainer: {
        height: 80,
        paddingTop: 5,
        paddingRight: 30,
        flex: 1,
        flexDirection: 'row',
    },
    lengthContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: 20,
        margin: 5,
    },
});