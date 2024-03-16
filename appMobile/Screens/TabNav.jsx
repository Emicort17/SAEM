import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from './miperfil';
import Configuracion from './settings';
import Expediente from './expediente';
import Seguimineto from './seguimineto';

import { MaterialIcons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNav = () => {

  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          headerStyle: { backgroundColor: '#092088' },
          headerTitleStyle: { color: '#fff' }, // Cambia el color del texto del encabezado
          tabBarLabelStyle: { fontSize: 25 },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={'#1C3344'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Expediente"
        component={Expediente}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          headerTitleStyle: { color: '#fff' },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          headerStyle: { backgroundColor: '#092088' },
          tabBarLabelStyle: { fontSize: 25, },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="folder" size={24} color="#1C3344" />
          ),
        }}
      />
      <Tab.Screen
        name="Configuracion"
        component={Configuracion}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          headerTitleStyle: { color: '#fff' },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          headerStyle: { backgroundColor: '#092088' },
          tabBarLabelStyle: { fontSize: 25, },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={'#1C3344'} size={30} />
          ),
        }}
      />

     



    </Tab.Navigator>
  );
}

export default TabNav;
