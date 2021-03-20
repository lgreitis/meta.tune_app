import * as React from 'react';
import {StatusBar, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './routes/loginStack';
import HomeStack from './routes/homeStack'
import loginUtils from './lib/loginUtils'
import { showMessage, hideMessage } from "react-native-flash-message";

export const AuthContext = React.createContext();

export default function App() {
  StatusBar.setBarStyle('dark-contgen', true);
  const[isLoggedIn, setIsLoggedIn] = React.useState(false)
  React.useEffect(() =>
  {
    loginUtils.isLoggedIn((res) => {
        setIsLoggedIn(res);
    })
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        loginUtils.submitHandler(data.email, data.password, (res) => {
          if (res !== false) {
            setIsLoggedIn(true)
          }
        })
      },
      signOut: () => setIsLoggedIn(false),
      signUp: async data => {
        loginUtils.signUpHandler(data.username, data.email, data.password, data.password2, (res, status, errorMsg) => {
          // TODO: go to login after this
          if(status === 201){
            showMessage({
              message: "Registered successfully",
              type: "success",
            });
          }
          if(status === 400){
            // showMessage({
            //   message: errorMsg,
            //   type: "danger",
            // });
            alert(errorMsg);
          }
        })
      },
      test: () => {
        loginUtils.isLoggedIn()
      }
    }),
    []
  );
  const alert = (message) =>
  {
    Alert.alert(
      ":(",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
 

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoggedIn ? (
          <HomeStack />
        ) : (
          <LoginStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
