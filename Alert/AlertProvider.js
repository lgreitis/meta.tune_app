import React from 'react';
import Alert from './Alert';
const initialState = {
  isOpen: false,
  message: ''
};
export const alertContext = React.createContext(initialState);
const { Provider } = alertContext;
export default props => {
  const [alertState, setAlertState] = React.useState(initialState);
  
  alert = (message) => {
    setAlertState({
      isOpen: true,
      message,
    });
  };
  close = () => {
    setAlertState(initialState);
  };
  return (
    <>
      <Provider value={alert}>{props.children}</Provider>
      <Alert {...alertState} close={close} />
    </>
  );
};