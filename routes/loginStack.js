import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Register from '../screens/register';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoginStack;
