import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Room from '../screens/room';
import AddRoom from '../screens/addRoom'
import Header from '../components/header'

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: '#43485b' } }}>
            <Stack.Screen
                name="Rooms"
                component={Home}
                options={{ headerShown: false }}
                backgroundColor='red'
            />
            <Stack.Screen
                name="Room"
                component={Room}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddRoom"
                component={AddRoom}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
