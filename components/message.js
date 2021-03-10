import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function Message({ message }) {
    return (
        <View style={[styles.container, message.key%2 == 0 ? styles.color1 : styles.color2 ]}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={require('../Logo/user.png')}
                />
            </View>
            <View style={styles.messageContainer}>
                <Text style={[styles.text, styles.userText]}>{message.user}</Text>
                <Text style={styles.text}>{message.text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 1,
        minHeight: 60,
        maxHeight: 120,
        paddingHorizontal: 10,
    },
    avatarContainer: {
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 20,
    },
    avatar: {
        height: 40,
        width: 40,
        overflow:'visible',
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    text:{
        color: '#fff',
        fontSize: 18,
    },
    userText:{
        color: '#8ecfe6',
    },
    color1:{
        backgroundColor: '#272b36',
    },
    color2:{
        backgroundColor:'#43485b',
    }

});