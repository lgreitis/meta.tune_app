import React from 'react';
import Alert from '../components/alert';
const initialState = {
  isOpen: false,
  message: '',
  buttonText: '',
  customAlertName: ''
};
export const alertContext = React.createContext(initialState);
const { Provider } = alertContext;
export default props => {
  const [alertState, setAlertState] = React.useState(initialState);
  
  alert = (message = '', buttonText = 'OK', customAlertName = '') => {
    setAlertState({
      isOpen: true,
      message,
      buttonText,
      customAlertName,
    });
  };
  close = () => {
    setAlertState(initialState);
  };
  return (
    <>
      <Provider value={alert}>{props.children}</Provider>
      <Alert {...alertState} close={close}  />
    </>
  );
};