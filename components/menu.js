import * as React from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableWithoutFeedback } from 'react-native';
import MenuItem from './menuItem'

export default function Menu({navigation, signOut, closeMenu}) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../Logo/Meta.Tunetransparent.png')}
            />
            <TouchableWithoutFeedback onPress={closeMenu}>
                <View style={styles.itemsContainer}>
                    <MenuItem text="Create a room" onPress={() => {closeMenu(), navigation.navigate('AddRoom')}}/>
                    <MenuItem text="My playlist" onPress={() => {closeMenu(), navigation.navigate('Playlist') }}/>
                    <MenuItem text="Log out" onPress={() => {closeMenu(), signOut() }}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const screen = Dimensions.get('screen')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#43485b'
    },
    logo: {
        width: screen.width * 0.7,
        height: screen.width * 0.7,
    },
    itemsContainer: {
        marginTop: -30
    }
    

})