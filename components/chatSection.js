import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Dimensions, Keyboard, Button } from 'react-native';
import io, { Socket } from 'socket.io-client';
import Message from './message'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import zIndex from '@material-ui/core/styles/zIndex';

const ChatSection = React.forwardRef((props, ref) => {
    const [messages, setMessages] = useState([

    ])
    const [message, setMessage] = useState('')

    const room = props.room;
    
    useEffect(() => {
        ref.current.on('chat message', (msg) => onMessage(msg))
        ref.current.on('delete message', (msg) => onDelete(msg))
        return () => {
            ref.current.off('chat message')
            ref.current.off('delete message')
        }
    }, []);

    let key = messages.length;
    

    const submitHandler = () => {
        if (!message)
            return;
        ref.current.emit('chat message', message)
        Keyboard.dismiss();
        setMessage('');
    }

    const renderMessageOfTheDay = () => {
        return (
            <Text style={styles.noStateMessage}>{room.motd}</Text>
        )
    }


    const onMessage = (content) => {
        console.log("new message from server")
        addMessage(content);
    }

    const addMessage = (message) => {
        key++;
        console.log(key);
        setMessages(prevMessages => {
            return [
                {
                    user: message.user,
                    text: message.text,
                    key: key,
                    deleted: false,
                    ms_id: message.ms_id
                },
                ...prevMessages
            ]
        })
    }

    const onDelete = (msg) => {
        deleteMessage(msg.ms_id)
    }
    const deleteMessage = (ms_id) => {
        setMessages(prevMessages => {
            let newMessages = prevMessages.map(msg => {
                if(msg.ms_id == ms_id)
                {
                    return {...msg, deleted: true}
                }
                else
                {
                    return msg
                }
            })
            return newMessages
        })
    }

    const deleteMessagePress = (message) => {
        if (message.deleted)
            return;
        else if(message.ms_id == undefined)
            return;
        else {
            ref.current.emit('delete message', message.ms_id);
        }
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
                        <Message message={item} deleteMessagePress={deleteMessagePress} />
                    )}
                    ListFooterComponent={renderMessageOfTheDay}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Type something...'
                    placeholderTextColor='#7d8bb5'
                    onChangeText={(val) => setMessage(val)}
                    onSubmitEditing={submitHandler}
                    color='white'
                    value={message}
                />
                <TouchableOpacity onPress={submitHandler} style={styles.iconContainer} containerStyle={styles.containerIconContainer} >
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
        flex: 1,
        height: 69,
        paddingHorizontal: 20,
        paddingVertical: 10,
        maxHeight: 70,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: '#474b53',
        flex: 1,
        borderRadius: 50,
        paddingLeft: 30,
        fontSize: 17,
    },
    iconContainer: {
        backgroundColor: '#bf9dfe',
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerIconContainer: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    icon: {
        fontSize: 30,
        color: 'white',
    },
    noStateMessage:
    {
        color: 'white',
        // transform: [{ scaleY: -1 }],
        fontSize: 17,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#474b53',
        borderTopWidth: 1,
        borderTopColor: '#474b53',
        maxHeight: 205,
    }
});