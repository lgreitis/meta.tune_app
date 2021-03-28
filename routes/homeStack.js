import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home'
import Room from '../screens/room';
import AddRoom from '../screens/addRoom'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerStyle: { backgroundColor: '#43485b' } }}>
                <Stack.Screen
                    name="Home"
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
        </NavigationContainer>
    );
}

export default HomeStack;
