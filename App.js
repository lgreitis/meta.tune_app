import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import LoginStack from './routes/loginStack'
import HomeStack from './routes/homeStack'

export default function App() 
{
  return (

      <NavigationContainer>
        {!false
          ? <LoginStack />
          : <HomeStack />
        }
      </NavigationContainer>

  );
}
