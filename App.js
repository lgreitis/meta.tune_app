import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStack from './routes/loginStack';
import HomeStack from './routes/homeStack'
import loginUtils from './lib/loginUtils'

export const AuthContext = React.createContext();

export default function App() {
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
          if (res !== false){
            dispatch({ type: 'SIGN_IN', loginInfo: res });
          }
        })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

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
