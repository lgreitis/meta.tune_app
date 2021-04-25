import * as React from 'react';
import { StatusBar, View, Text, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './routes/loginStack';
import HomeStack from './routes/homeStack'
import loginUtils from './lib/loginUtils'
import AlertProvider from './context/alertContext'
import AuthProvider, { authContext } from './context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export default function App() {
  StatusBar.setBarStyle('dark-contgen', true);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [name, setName] = React.useState('')


  React.useEffect(() => {
    loginUtils.isLoggedIn((res) => {
      setIsLoggedIn(res);
    })
    let loginListener =DeviceEventEmitter.addListener("login", (event) => { login(event.name)})
    let registerListener = DeviceEventEmitter.addListener("logout", (event) => { logout() })

    return () => {
      loginListener.remove();
      registerListener.remove();
    }
  }, []);

  const login = (name) => {
    setIsLoggedIn(true);
    console.log("login: " + name);
    storeName(name)
  }
  const logout = () => {
    setIsLoggedIn(false); 
    console.log("logout")
    
  }

  const storeName = async (value) => {
    try {
      await AsyncStorage.setItem('@name', value)
    } catch (e) {
      console.log("failed setting name")
    }
  }

  return (
    <AlertProvider>
      <View style={{ backgroundColor: '#282a36', flex: 1 }}>
        <AuthProvider>
          {isLoggedIn ? (
            <HomeStack />
          ) : (
            <LoginStack />
          )}
        </AuthProvider>
      </View>
    </AlertProvider>
  );
}
