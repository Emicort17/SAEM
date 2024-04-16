import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Seguimiento from '../Screens/seguimiento';
import TabNav from '../Screens/TabNav';
import Login from '../Screens/Login';
import { useAuth } from '../config/context/AuthContext';
const Stack = createNativeStackNavigator();

const MainRoutes = () => {
  const { userData, onLoginSuccess } = useAuth(''); // Cambio de userType a userData

  console.log('entro  mainroutes');
  console.log(userData);
  return (

    <Stack.Navigator>
    
      <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />
      <Stack.Screen name="Informe" component={Seguimiento} options={{
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
      }} />
    </Stack.Navigator>


  );
};


export default MainRoutes;
