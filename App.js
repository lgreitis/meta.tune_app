import * as React from 'react';
import { StatusBar, View, Text, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './routes/loginStack';
import HomeStack from './routes/homeStack'
import loginUtils from './lib/loginUtils'
import AlertProvider from './context/alertContext'
import AuthProvider, { authContext } from './context/AuthContext'

export const AuthContext = React.createContext();

export default function App() {
  StatusBar.setBarStyle('dark-contgen', true);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  const {} = React.useContext(authContext);

  React.useEffect(() => {
    loginUtils.isLoggedIn((res) => {
      setIsLoggedIn(res);
    })
    DeviceEventEmitter.addListener("login", (event)=>{setIsLoggedIn(true); console.log("login")})
    DeviceEventEmitter.addListener("logout", (event)=>{setIsLoggedIn(false); console.log("logout")})

    return() => {
      DeviceEventEmitter.removeListener("login")
      DeviceEventEmitter.removeListener("logout")
    }
  }, []);
  
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
