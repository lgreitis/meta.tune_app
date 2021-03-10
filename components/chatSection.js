import React, { useState } from 'react';
import { StyleSheet, Text, View, BackHandler, FlatList, TextInput, Dimensions, Keyboard } from 'react-native';
import io from 'socket.io-client';
import Message from './message'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function ChatSection({ room }) {
    const [messages, setMessages] = useState([
        {
            user: 'user1',
            text: 'message1',
            key: 1,
        },
        {
            user: 'user2',
            text: 'message57864',
            key: 2,
        },
        {
            user: 'user3',
            text: 'VERY VERY VERY LONG MESSAGE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa',
            key: 3,
        },
        {
            user: 'user4',
            text: 'message3345754',
            key: 4,
        },
        {
            user: 'user9',
            text: 'message3',
            key: 5,
        },
        {
            user: 'user9',
            text: 'message3',
            key: 6,
        },
        {
            user: 'user9',
            text: 'message3',
            key: 7,
        },
    ])
    const [message, setMessage] = useState('')

    var socket = io("http://88.119.36.191:8888", {
        query: {
            slug: room.slug
        },
        transports: ["websocket"] // HTTP long-polling is disabled
    });


    socket.on('chat message', (content) => {
        console.log(content)
    });

    BackHandler.addEventListener('hardwareBackPress', function () {
        socket.disconnect()
    });

    const sendMessage = () =>
    {
        if(message.length == 0)
            return;

        console.log(message);
        Keyboard.dismiss();
        let key = messages.length + 1;
        setMessages(prevMessages => {
            return [
                {
                    user: 'currentUser',
                    text: message,
                    key: key
                },
                ...prevMessages
            ]
        }

        )
        setMessage('');
    }
    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                <FlatList
                    data={messages}
                    horizontal={false}
                    keyExtractor={item => item.key.toString()}
                    inverted={true}
                    renderItem={({ item }) =>
                    (
                        <Message message={item} />
                    )}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Type something...'
                    placeholderTextColor='#646c8d'
                    onChangeText={(val) => setMessage(val)}
                    onSubmitEditing={sendMessage}
                    
                    value={message}
                />
                    <TouchableOpacity onPress={sendMessage} containerStyle={styles.iconContainer}>
                        <Ionicons name="send-outline" style={styles.icon}/>
                    </TouchableOpacity>
            </View>
        </View>
    );
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    chatContainer: {
        backgroundColor: '#55585b',
        flex: 1,
        minWidth: 0,
    },
    inputContainer: {
        backgroundColor: '#272b36',
        borderTopWidth: 1,
        flex: 0,
        height: 69,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    input: {
        backgroundColor: '#474b53',
        flex: 1,
        borderRadius: 50,
        paddingLeft: 30,
        fontSize: 17,
        
    },
    iconContainer:{
        position: 'absolute',
        right: 20,
        top: 10,
    },
    icon: {
        fontSize: 30,
        color:'white',
        padding: 8,
        backgroundColor: '#bf9dfe',
        borderRadius: 43,  
    }
});