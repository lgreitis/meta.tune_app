import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Dimensions, Keyboard, Button } from 'react-native';
import io from 'socket.io-client';
import Message from './message'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatSection = React.forwardRef((props, ref) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const room = props.room;

    useEffect(() => {
        ref.current.on('chat message', (msg) => onMessage(msg))
      }, []);

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
    }

    const submitHandler = () => {
        if (!message)
            return;
        ref.current.emit('chat message', message)
        Keyboard.dismiss();
        setMessage('');
    }

    const renderNoStateMessage = () => {
        return (
            <Text style={styles.noStateMessage}>{room.motd}</Text>
        )
    }


    const onMessage = (content) =>
    {
        console.log("new message from server")
        addMessage(content);
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
                    ListEmptyComponent={renderNoStateMessage}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Type something...'
                    placeholderTextColor='#646c8d'
                    onChangeText={(val) => setMessage(val)}
                    onSubmitEditing={submitHandler}
                    color='white'
                    value={message}
                />
                <TouchableOpacity onPress={submitHandler} containerStyle={styles.iconContainer}>
                    <Ionicons name="send-outline" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
})

export default ChatSection;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    chatContainer: {
        backgroundColor: '#282a36',
        flex: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#474b53',
        borderBottomColor: '#474b53',
    },
    inputContainer: {
        backgroundColor: '#272b36',
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
    iconContainer: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    icon: {
        fontSize: 30,
        color: 'white',
        padding: 8,
        backgroundColor: '#bf9dfe',
        borderRadius: 43,
    },
    noStateMessage:
    {
        color: 'white',
        transform: [{ scaleY: -1 }],
        fontSize: 15,
        paddingLeft: 20,
        paddingBottom: 15,
    }
});