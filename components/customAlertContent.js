import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import Emoji from 'react-native-emoji';
export default props => {

    const { isOpen, close, message, buttonText, name } = props;

    if (!name) {
        return (
            <View style={styles.alertMessageContainer}>
                <Text style={styles.alertMessage}> {message} </Text>
            </View>
        )
    }

    else if (name == 'lmao') {
        return (
            <View style={styles.alertMessageContainer}>
                <Text style={styles.alertMessage}> {"Oopsie..."} </Text>
                <Text style={styles.alertMessage}> {"I made a poopsy"} </Text>
                <Emoji name="disappointed" style={styles.emoji} />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Emoji name="point_right" style={styles.emoji} />
                    <Emoji name="point_left" style={styles.emoji} />
                </View>
            </View>
        );
    }
    else{
        return (
            <View style={styles.alertMessageContainer}>
                <Text style={styles.alertMessage}> {message} </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    alertMessageContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexGrow: 1,
        minWidth: 50,
        paddingHorizontal: 30,
        paddingVertical: 10,
        textAlign: 'center',
        margin: 5,
    },
    alertMessage: {
        fontSize: 24,
        color: "#fff",
        textAlign: 'center',
    },
    emoji: {
        fontSize: 30,
        textAlign: 'center',
    }
});