import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import animation from '../Screens/animation/';
import ForgetPass from '../Screens/forgetpass';

const Stack = createNativeStackNavigator();


const OtherRoutes = () => {
 

  console.log('entro  otheroutes');
  return (

    <Stack.Navigator>
      <Stack.Screen name="Animation" component={animation} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} options={{ headerShown: false }} />
    </Stack.Navigator>


  );
};


export default OtherRoutes;
