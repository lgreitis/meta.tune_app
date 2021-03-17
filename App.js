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

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userLoginInfo: action.loginInfo,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userLoginInfo: action.loginInfo,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userLoginInfo: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userLoginInfo: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        loginUtils.submitHandler(data.email, data.password, (res) => {
          if (res !== false) {
            dispatch({ type: 'SIGN_IN', loginInfo: res });
          }
        })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
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
        {state.userLoginInfo == null ? (
          <LoginStack />
        ) : (
          <HomeStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
