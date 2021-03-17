import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Dimensions, Keyboard } from 'react-native';
import io from 'socket.io-client';
import Message from './message'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChatSection({ room, navigation }) {
    const [messages, setMessages] = useState([

    ])
    const [message, setMessage] = useState('')

    //socket
    const ref = useRef();

    useEffect(() =>
    {
        //on component mount
        let socket = io("http://88.119.36.191:8888", {
            query: {
                slug: room.slug
            },
            transports: ["websocket"] // HTTP long-polling is disabled
        });

        socket.on('chat message', (content) => onMessage(content));

        ref.current = socket;

        //on component dismount
        return () => {
            socket.disconnect();
            console.log("socket disconnected");
        }
    }, []);

    const onMessage = (content) =>
    {
        console.log("new message from server")
        addMessage(content);
    }
    
    let key = messages.length;
    const addMessage = (message) =>
    {
        key++;
        console.log(key);
        setMessages(prevMessages =>
            {
                return[
                    {            
                        user: message.user,
                        text: message.text,
                        key: key
                    },
                    ...prevMessages
                ]
            })

        //console.log(messages);
    }

    const sendMessage = () =>
    {
        if(!message)
            return;
        ref.current.emit('chat message', message)
        Keyboard.dismiss();
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