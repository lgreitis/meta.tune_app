import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Room from '../screens/room';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Rooms" component={Home} />
            <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
    );
}

export default HomeStack;
