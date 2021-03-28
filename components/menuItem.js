import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default function MenuItem({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.menuItem}>
                <Text style={styles.itemText}> {text} </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    menuItem: {
        backgroundColor: '#272b36',
        color: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 100,
    },
    itemText: {
        color: 'white',
        fontSize: 20,

    },
})