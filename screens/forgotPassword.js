import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback, Keyboard, Touchable, TouchableOpacity } from 'react-native';
import Button from '../components/button';

export default function ForgotPassword() {
    const [username, setUsername] = useState(
        {
            username: ""
        }
    );

    const changeHandlerEmail = (val) => {
        setUsername(val);
    }

    const submitHandler = () => {
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Image
                    style={{ width: 250, height: 250, alignSelf: 'center', }}
                    source={require('../Logo/Meta.Tunetransparent.png')}
                />
                <View style={styles.textInput}>
                    <TextInput
                        placeholder='E-mail'
                        onChangeText={changeHandlerEmail}
                        placeholderTextColor='#6272a4'
                        value={username}
                    />
                </View>
                <Button
                    onPress={submitHandler}
                    title='Reset password'
                    backgroundColor='#bd93f9'
                />
                <View>
                    <TouchableOpacity>
                        <Text style={styles.text}>Back to log in screen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#282a36',
        flex: 1,
        justifyContent: 'center',
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
});