import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import animation from '../Screens/animation/';
import ForgetPass from '../Screens/forgetpass';
import Seguimiento from '../Screens/seguimineto';
import TabNav from '../Screens/TabNav';


const Stack = createNativeStackNavigator();

const MainRoutes = () => {
  
  return (

    <Stack.Navigator>

      <Stack.Screen name="Animation" component={animation} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} options={{ headerShown: false }} />
      <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }}/>
      <Stack.Screen name="Seguimiento" component={Seguimiento}  options={{
          tabBarShowLabel: false,
          headerShown: true,
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff', // Cambia el color de la flecha de retroceso
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          headerStyle: { backgroundColor: '#092088' },
          tabBarLabelStyle: { fontSize: 25, },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={'#1C3344'} size={30} />
          ),
        }}/>

      
    

    </Stack.Navigator>


  );
};


export default MainRoutes;
