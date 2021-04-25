import React from 'react';
import loginUtils from '../lib/loginUtils'
import { alertContext } from './alertContext';
import { showMessage, hideMessage } from "react-native-flash-message";
import { DeviceEventEmitter } from 'react-native'


export const authContext = React.createContext(false);
const { Provider } = authContext;

export default props => {
  const alert = React.useContext(alertContext);

  const auth = React.useMemo(
    () => ({
      signIn: async data => {
        loginUtils.submitHandler(data.email, data.password, (res) => {
          if (res.success === true) {
            DeviceEventEmitter.emit('login', { name: res.name});
          }
          else {
            if (res.message == "Password incorrect") {
              alert("Incorrect password.")
            }
            else if (res.message == "That email is not registered") {
              alert("This email is not registered")
            }
            else {
              alert("Something went wrong on the server")
            }
          }
        })
      },
      signOut: () => {
        DeviceEventEmitter.emit('logout', {});
        const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
        RCTNetworking.clearCookies(() => { });
      },
      signUp: async data => {
        loginUtils.signUpHandler(data.username, data.email, data.password, data.password2, (res, status, errorMsg) => {
          // TODO: go to login after this
          if (status === 201) {
            alert("Registered successfully")
          }
          if (status === 400) {
            alert("User with this email already exists")
          }
        })
      }
    }),
    []
  );

  return (
    <>
      <Provider value={auth}>{props.children}</Provider>
    </>
  );
};