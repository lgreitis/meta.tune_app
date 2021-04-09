import React, { useState } from 'react';
import {
    StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback,
    Keyboard, Touchable, TouchableOpacity, Dimensions, KeyboardAvoidingView
} from 'react-native';
import Button from '../components/button';
import roomUtils from '../lib/roomUtils'
import { alertContext } from '../context/alertContext';

export default function AddRoom({ route, navigation }) {

    const [roomName, setRoomName] = useState('')
    const [description, setDescription] = useState('')
    const [messageOfTheDay, setMessageOfTheDay] = useState('')

    const alert = React.useContext(alertContext);

    const createRoom = () => {
        if (!roomName || !description || !messageOfTheDay) {
            alert('Please enter all fields')
            return;
        }
        if (roomName.length < 5) {
            alert('Room length should be at least 5 characters')
            return;
        }

        roomUtils.addRoom(roomName, description, messageOfTheDay, (res, status) => {
            console.log(status)
            if (status === 200) {
                alert('Room created!')
                Keyboard.dismiss();
                navigation.goBack();
                return;
            }
            if (status === 401) {
                alert('Not logged in :(')
                return;
            }
            if (status === 403) {
                alert('Room with this name already exists');
                return;
            }
        })
        console.log("creating room.")
        console.log(`${roomName}, ${description}, ${messageOfTheDay}`)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>{"Add room"}</Text>
                        </View>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Room name'
                                onChangeText={setRoomName}
                                placeholderTextColor='#6272a4'
                                value={roomName}
                                color='white'
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Description'
                                onChangeText={setDescription}
                                placeholderTextColor='#6272a4'
                                value={description}
                                color='white'
                            />
                        </View>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Message of the day'
                                onChangeText={setMessageOfTheDay}
                                placeholderTextColor='#6272a4'
                                value={messageOfTheDay}
                                color='white'
                            />
                        </View>
                    </View>

                    <Button
                        onPress={createRoom}
                        title='Create room!'
                        backgroundColor='#bd93f9'
                    />
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        maxHeight: screen.height * 0.1,
        height: screen.height * 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#44475a',
        paddingBottom: '2%',
        flex: 1,
    },
    headerTextContainer: {
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
    },
    headerText: {
        fontSize: 25,
        color: 'white',
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    formContainer: {
        paddingTop: 10,
    }
});