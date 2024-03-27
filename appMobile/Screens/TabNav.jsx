import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from './miperfil';
import Configuracion from './settings';
import Expediente from './expediente';
import Seguimineto from './seguimineto';
import { View, StyleSheet } from 'react-native'; // Añadido StyleSheet y View

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
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name="person" color={'#1C3344'} size={30} />
            </View>
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
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Entypo name="folder" size={24} color={'#1C3344'} />
            </View>
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
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name="settings" color={'#1C3344'} size={30} />
            </View>
          ),
        }}
      />

     



    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerActive: {
    backgroundColor: '#E5E5E5', // Color del indicador cuando la pestaña está activa
    borderRadius: 50, // Ajusta según el tamaño del indicador deseado
    width: 40, // Ajusta según el tamaño del indicador deseado
    height: 40, // Ajusta según el tamaño del indicador deseado
  },
});

export default TabNav;
